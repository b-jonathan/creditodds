# Contributing to CreditOdds

Thank you for your interest in contributing to CreditOdds! This guide will help you add new credit cards to our database.

## Adding a New Credit Card

Credit card data is stored as YAML files in the `data/cards/` directory. To add a new card:

### 1. Create a YAML File

Create a new file in `data/cards/` with a URL-friendly name:

```
data/cards/your-card-name.yaml
```

**Naming convention**: lowercase letters, numbers, and hyphens only. Example: `chase-freedom-unlimited.yaml`

### 2. Add Card Information

Use this template:

```yaml
name: "Full Card Name"
bank: "Issuing Bank"
slug: "your-card-name"  # Must match filename without .yaml
image: "your-card-name.png"  # Optional
accepting_applications: true
category: "travel"  # Optional: travel, cashback, business, student, secured, rewards, other
annual_fee: 0  # Optional: Annual fee in USD
```

#### Required Fields

| Field | Description |
|-------|-------------|
| `name` | Full official name of the credit card |
| `bank` | Issuing bank or financial institution |
| `slug` | URL-friendly identifier (must match filename) |
| `accepting_applications` | `true` if currently accepting applications, `false` if discontinued |

#### Optional Fields

| Field | Description |
|-------|-------------|
| `image` | Filename for card image (stored in CloudFront) |
| `category` | Card category for filtering |
| `annual_fee` | Annual fee in USD (0 for no annual fee) |

### 3. Validate Your Changes

Run the build script to validate your YAML file:

```bash
npm run build:cards
```

This will check for:
- Required fields
- Valid slug format
- Valid category values
- Proper YAML syntax

### 4. Submit a Pull Request

1. Fork the repository
2. Create a branch: `git checkout -b add-card-name`
3. Add your YAML file
4. Run `npm run build:cards` to validate
5. Commit your changes: `git commit -m "Add Card Name"`
6. Push to your fork: `git push origin add-card-name`
7. Open a Pull Request

### Example

Here's a complete example for the Chase Sapphire Preferred:

```yaml
# data/cards/chase-sapphire-preferred.yaml
name: "Chase Sapphire Preferred Card"
bank: "Chase"
slug: "chase-sapphire-preferred"
image: "chase-sapphire-preferred.png"
accepting_applications: true
category: "travel"
annual_fee: 95
```

## Questions?

If you have questions about contributing, please open an issue or reach out through our contact page.
