#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CARDS_DIR = path.join(__dirname, '..', 'data', 'cards');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'cards.json');
const SCHEMA_FILE = path.join(CARDS_DIR, 'schema.json');

function loadSchema() {
  const schemaContent = fs.readFileSync(SCHEMA_FILE, 'utf8');
  return JSON.parse(schemaContent);
}

function validateCard(card, schema) {
  const errors = [];

  // Check required fields
  for (const field of schema.required) {
    if (card[field] === undefined || card[field] === null) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Validate slug pattern
  if (card.slug && !/^[a-z0-9-]+$/.test(card.slug)) {
    errors.push(`Invalid slug format: ${card.slug} (must be lowercase with hyphens only)`);
  }

  // Validate category enum
  if (card.category && schema.properties.category.enum) {
    if (!schema.properties.category.enum.includes(card.category)) {
      errors.push(`Invalid category: ${card.category}`);
    }
  }

  // Validate annual_fee
  if (card.annual_fee !== undefined && (typeof card.annual_fee !== 'number' || card.annual_fee < 0)) {
    errors.push(`Invalid annual_fee: ${card.annual_fee}`);
  }

  return errors;
}

function buildCards() {
  console.log('Building cards.json from YAML files...\n');

  const schema = loadSchema();
  const cards = [];
  const errors = [];

  // Read all YAML files in the cards directory
  const files = fs.readdirSync(CARDS_DIR).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));

  console.log(`Found ${files.length} card file(s)\n`);

  for (const file of files) {
    const filePath = path.join(CARDS_DIR, file);
    console.log(`Processing: ${file}`);

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const card = yaml.load(content);

      // Validate the card
      const validationErrors = validateCard(card, schema);
      if (validationErrors.length > 0) {
        errors.push({ file, errors: validationErrors });
        console.log(`  ERROR: ${validationErrors.join(', ')}`);
        continue;
      }

      // Add card_id based on slug for compatibility with existing system
      card.card_id = card.slug;
      card.card_name = card.name; // Alias for compatibility

      cards.push(card);
      console.log(`  OK: ${card.name}`);
    } catch (err) {
      errors.push({ file, errors: [err.message] });
      console.log(`  ERROR: ${err.message}`);
    }
  }

  console.log('\n---');

  if (errors.length > 0) {
    console.error(`\nValidation failed with ${errors.length} error(s):`);
    for (const { file, errors: fileErrors } of errors) {
      console.error(`  ${file}:`);
      for (const err of fileErrors) {
        console.error(`    - ${err}`);
      }
    }
    process.exit(1);
  }

  // Sort cards by name
  cards.sort((a, b) => a.name.localeCompare(b.name));

  // Write output
  const output = {
    generated_at: new Date().toISOString(),
    count: cards.length,
    cards: cards,
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
  console.log(`\nSuccessfully built ${cards.length} card(s) to ${OUTPUT_FILE}`);
}

buildCards();
