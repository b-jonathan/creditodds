# Contributing News Updates

Help keep the CreditOdds community informed about credit card news!

## How to Add News

1. Fork the repository
2. Create a new YAML file in `data/news/` with the naming format: `YYYY-MM-DD-short-description.yaml`
3. Fill in the required fields (see template below)
4. Submit a Pull Request

## Template

```yaml
id: "unique-id-for-this-news"
date: "2024-03-15"
title: "Short Title for the News"
summary: "A brief 1-2 sentence description of the news update."
tags:
  - new-card
bank: "Bank Name"  # optional
card_slug: "card-slug"  # optional, links to card page
card_name: "Card Display Name"  # required if card_slug is provided
source: "Source Name"  # optional
source_url: "https://example.com/article"  # optional
```

## Valid Tags

| Tag | Description |
|-----|-------------|
| `new-card` | New credit card launched |
| `discontinued` | Card no longer accepting applications |
| `bonus-change` | Welcome bonus increased or decreased |
| `fee-change` | Annual fee or other fees changed |
| `benefit-change` | Card benefits added, removed, or modified |
| `limited-time` | Temporary offer or promotion |
| `policy-change` | Issuer policy update |
| `general` | Other credit card news |

## Field Descriptions

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique identifier (lowercase, hyphens only) |
| `date` | Yes | Date of the news in YYYY-MM-DD format |
| `title` | Yes | Brief headline (keep under 80 characters) |
| `summary` | Yes | 1-2 sentence description |
| `tags` | Yes | Array of 1+ valid tags |
| `bank` | No | Bank/issuer name |
| `card_slug` | No | Card slug to link to card page |
| `card_name` | No | Display name for card link (required if card_slug provided) |
| `source` | No | Name of the source |
| `source_url` | No | URL to the original article |

## Validation

Before submitting, you can validate your news file locally:

```bash
npm run build:news
```

This will check for:
- Required fields
- Valid date format
- Valid tags
- Valid ID format (lowercase with hyphens)

## Questions?

[Open an issue](https://github.com/CreditOdds/creditodds/issues) if you have questions or need help.
