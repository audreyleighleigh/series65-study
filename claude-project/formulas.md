# Series 65 Formula Reference

_Auto-generated from src/data.js. 54 formulas across 11 sections._

## How to use this file

This is Audrey's canonical formula sheet for the Series 65. When she says 'quiz me on formulas,' 'drill formulas from [section],' 'start me at the top and go through every formula,' or 'give me a random formula,' pull from this file — it is the source of truth.

For each formula, name it first and wait for her recitation before revealing the answer. When she nails it, briefly confirm and move on. When she misses it, state the formula, offer the memory hook, walk through the worked example, then re-ask a few formulas later in the session.

## Contents

- **Options** (4): Long Call (Buy a Call) · Short Call (Sell/Write a Call) · Long Put (Buy a Put) · Short Put (Sell/Write a Put)
- **Order Types** (2): Order Types — What Each Guarantees · Order Placement Mnemonic — SLoBS / BLiSS
- **Taxes** (3): Cost Basis · Sales Proceeds · Tax Rate Matrix — Quick Reference
- **Portfolio Analysis** (10): CAPM (Expected Return) · Alpha · Sharpe Ratio · Total Return · Holding Period Return (HPR) · After-Tax Return · Real Rate of Return · Rule of 72 — Years to Double · Rule of 72 — Rate Needed · Inflation-Adjusted Future Cost
- **Descriptive Statistics** (4): Mean · Median · Mode · Range
- **Bond Pricing & Yields** (3): Current Yield (CY) · Yield Hierarchy — Discount Bond · Yield Hierarchy — Premium Bond
- **Convertibles & Parity** (4): Conversion Ratio · Conversion Price · Parity Price of Bond · Parity Price of Stock
- **Tax-Equivalent Yields** (2): Taxable Equivalent Yield (of a Muni) · Tax-Free Equivalent Yield (of a Corporate)
- **Margin** (6): Regulation T (Initial Requirement) · Minimum Equity to Open a Margin Account · Long Account Equity · Short Account Equity · Long Account Maintenance Minimum · Short Account Maintenance Minimum
- **Fundamental Analysis** (12): Net Worth (Stockholders' Equity) · Net Working Capital · Current Ratio · Quick Assets · Quick Ratio (Acid Test) · Debt Service Coverage Ratio · Earnings Per Share (EPS) · Price-to-Earnings (P/E) Ratio · Dividend Yield · Dividend Payout Ratio · Gross Margin · Book Value Per Share
- **Fund Pricing** (4): Net Asset Value (NAV) Per Share · Public Offering Price (POP) · Sales Charge % · Closed-End Fund Discount / Premium

---

# Options

## Long Call (Buy a Call)

_id: `long-call`_

**Formula.** Breakeven = Strike + Premium · Max Gain = Unlimited · Max Loss = Premium paid

**When.** Bullish. Also used to hedge a short stock position (locks in a ceiling buy-back price).

**Memory.** Buying gives you rights, not obligations. Call = right to BUY. You pay premium up front (your max loss), then you break even when the stock covers both the strike AND the premium you paid.

**Example.** Buy XYZ 50 call for $3. B/E = 50 + 3 = $53. Below $53 at expiry you lose. Above $53 you profit. Max loss = $300 (per contract).

---

## Short Call (Sell/Write a Call)

_id: `short-call`_

**Formula.** Breakeven = Strike + Premium · Max Gain = Premium received · Max Loss = Unlimited (naked) / Capped (covered)

**When.** Bearish or neutral. When paired with long stock = covered call = income + partial hedge.

**Memory.** Selling collects premium up front (your max gain). Naked = unlimited risk if stock rockets. Covered = you already own the shares so the delivery is capped.

**Example.** Sell XYZ 50 call for $3. Collect $300. B/E for the buyer = $53; anything above $53 costs you dollar-for-dollar.

---

## Long Put (Buy a Put)

_id: `long-put`_

**Formula.** Breakeven = Strike − Premium · Max Gain = Strike − Premium · Max Loss = Premium paid

**When.** Bearish. Also used to hedge a long stock position (locks in a floor sell price).

**Memory.** Put = right to SELL. You pay premium (max loss). You break even when the stock drops enough to cover the premium you paid. Max gain is capped because the stock can only fall to zero.

**Example.** Buy XYZ 50 put for $2. B/E = 50 − 2 = $48. Max gain = 48 − 0 = $48 (per share) if stock goes to zero.

---

## Short Put (Sell/Write a Put)

_id: `short-put`_

**Formula.** Breakeven = Strike − Premium · Max Gain = Premium received · Max Loss = Strike − Premium

**When.** Bullish or neutral. Income strategy paired with a short stock position.

**Memory.** Selling a put obligates you to BUY at the strike. Max gain = the premium you collected. Max loss capped because the stock can only fall to zero (you'd be forced to buy at strike and it's worth $0).

**Example.** Sell XYZ 50 put for $2. Collect $200. B/E = $48. Max loss = 50 − 2 = $48/share if stock goes to zero.

---

# Order Types

## Order Types — What Each Guarantees

_id: `order-types-summary`_

**Formula.** Market: execution guaranteed / price not · Limit: price guaranteed / execution not · Stop: nothing guaranteed (triggers a market order) · Stop-limit: nothing guaranteed (triggers a limit order)

**When.** Identifying which order type applies to a scenario or matching an order to a customer's objective.

**Memory.** Trade-off is always execution vs. price. Market = you WILL fill, but at whatever price. Limit = you get YOUR price, but might not fill.

---

## Order Placement Mnemonic — SLoBS / BLiSS

_id: `order-placement-mnemonic`_

**Formula.** Sell Limits and Buy Stops go ABOVE the market · Buy Limits and Sell Stops go BELOW the market

**When.** Choosing where to place a stop or limit order relative to current market price.

**Memory.** SLoBS = 'Sell Limit or Buy Stop' (above). BLiSS = 'Buy Limit or Sell Stop' (below). Sell limits sit above (you want a higher price); buy stops sit above (you buy on breakout). Buy limits sit below (you want a lower price); sell stops sit below (you sell to stop losses).

**Example.** Stock at $50. Sell limit at $55 (above). Buy stop at $55 (above, breakout). Buy limit at $45 (below). Sell stop at $45 (below, protective).

---

# Taxes

## Cost Basis

_id: `cost-basis`_

**Formula.** Cost Basis = Purchase Price + Commission

**When.** Determining the tax cost of an investment when computing capital gain or loss on sale.

**Memory.** Commissions on the BUY side get added into your basis (they raise it, reducing gain).

**Example.** Buy 100 shares at $50 + $25 commission. Cost basis = $5,000 + $25 = $5,025.

---

## Sales Proceeds

_id: `sales-proceeds`_

**Formula.** Sales Proceeds = Sale Price − Commission

**When.** Determining the net proceeds from a sale for computing capital gain or loss.

**Memory.** Commissions on the SELL side get subtracted from proceeds (they lower it, reducing gain).

**Example.** Sell 100 shares at $60 − $25 commission. Proceeds = $6,000 − $25 = $5,975.

---

## Tax Rate Matrix — Quick Reference

_id: `tax-rate-matrix`_

**Formula.** Qualified dividends: 0% / 15% / 20% · Non-qualified dividends: up to 37% (ordinary) · Corporate interest: federal (up to 37%) + state · U.S. gov interest: federal only, exempt from state · Muni interest: exempt from federal (state if resident) · Short-term cap gain (≤1 year): up to 37% · Long-term cap gain (>1 year): 0% / 15% / 20%

**When.** Comparing after-tax returns across asset classes.

**Memory.** Long-term qualified capital-gain treatment aligns with qualified dividend rates (0/15/20). Everything else that's ordinary income maxes at 37%.

---

# Portfolio Analysis

## CAPM (Expected Return)

_id: `capm-expected-return`_

**Formula.** Expected Return = Rf + β × (Rm − Rf)

**When.** Predicting the required/expected return for an investment given its systematic risk relative to the market.

**Memory.** Start at the risk-free floor (Rf). Add the market risk premium (Rm − Rf), scaled by beta (how much the investment moves with the market).

**Example.** Rf = 2%, Rm = 8%, β = 1.5 → Expected Return = 2% + 1.5 × (8% − 2%) = 11%.

---

## Alpha

_id: `alpha`_

**Formula.** Alpha = Actual Return − Expected Return (CAPM)

**When.** Measuring risk-adjusted OUTPERFORMANCE — how much a portfolio's actual return beat what CAPM predicted given its beta.

**Memory.** Positive alpha = manager added value. Zero alpha = matched expectation. Negative alpha = underperformed for the risk taken.

**Example.** Actual return = 12%, CAPM expected = 11% → Alpha = +1%.

---

## Sharpe Ratio

_id: `sharpe-ratio`_

**Formula.** Sharpe = (Actual Return − Risk-Free Return) ÷ Standard Deviation

**When.** Comparing risk-adjusted return per unit of TOTAL risk (not just systematic). Higher = better.

**Memory.** Sharpe uses standard deviation (total risk) as the denominator; Treynor uses beta. Sharpe is the more common measure for diversified portfolios.

**Example.** Return 12%, Rf 2%, σ 15% → Sharpe = (12 − 2) / 15 = 0.67.

---

## Total Return

_id: `total-return`_

**Formula.** Total Return = (Income + Capital Gain/Loss) ÷ Original Investment

**When.** Computing the complete return on any security, combining income (coupons/dividends) AND price change.

**Memory.** Coupon rate alone is NOT total return — add the capital gain/loss on the sale/call/maturity price.

**Example.** 5% bond at par, called at 104 after 1 year. Income $50 + capital gain $40 = $90. Total return = $90 / $1,000 = 9%.

---

## Holding Period Return (HPR)

_id: `holding-period-return`_

**Formula.** HPR = (Ending Value − Original Value + Income) ÷ Original Cost

**When.** Measuring the realized total return over any specific holding period. Same idea as total return, framed around the holding window.

**Memory.** Not annualized. Not forward-looking (that's expected return / CAPM). Backward-looking realized measurement of the period held.

**Example.** Buy at $100, sell at $110, collect $5 income → HPR = (110 − 100 + 5) / 100 = 15%.

---

## After-Tax Return

_id: `after-tax-return`_

**Formula.** After-Tax Return = All tax-adjusted gains and/or losses ÷ Original Investment

**When.** Comparing investments on an apples-to-apples basis after federal/state taxes.

**Memory.** The 'tax-adjusted' step is where you apply the applicable rate to each income type (qualified dividend rate, ordinary rate, cap gain rate).

**Example.** $1,000 gain, 24% ordinary bracket → after-tax gain = $760. If invested $10,000: after-tax return = 7.6%.

---

## Real Rate of Return

_id: `real-rate-of-return`_

**Formula.** Real Rate = Actual (Nominal) Return − Inflation Rate

**When.** Measuring purchasing-power growth — the return AFTER stripping out inflation.

**Memory.** Nominal return says 'you made X.' Real return says 'you actually got wealthier by X after prices moved.'

**Example.** Nominal 8%, inflation 3% → Real Rate = 5%.

---

## Rule of 72 — Years to Double

_id: `rule-of-72-years`_

**Formula.** Years to double = 72 ÷ Rate of Return (%)

**When.** Fast estimate of how long money doubles at a given compounding rate.

**Memory.** 72 is the magic number. Divide by rate → get years.

**Example.** At 8% → 72 ÷ 8 = 9 years to double.

---

## Rule of 72 — Rate Needed

_id: `rule-of-72-rate`_

**Formula.** Rate needed to double (%) = 72 ÷ Years

**When.** Fast estimate of what return you'd need to double your money in a target time.

**Memory.** Same magic 72, flipped: divide by years → get rate.

**Example.** Want to double in 6 years? 72 ÷ 6 = 12% required rate.

---

## Inflation-Adjusted Future Cost

_id: `inflation-adjusted-future-value`_

**Formula.** Future Amount = Today's Amount × (1 + inflation rate)^years

**When.** Estimating how many future dollars will be needed to buy what today's dollars buy now (retirement planning, education funding).

**Memory.** Same compounding mechanic as investment growth — applied to a rising cost instead. Multiply by (1 + rate) once per year.

**Example.** $15,000 today, 4% inflation, 3 years: 15,000 × 1.04³ ≈ $16,872.

---

# Descriptive Statistics

## Mean

_id: `mean`_

**Formula.** Mean = Sum of values ÷ Count of values

**When.** The simple average. Sensitive to outliers.

**Memory.** The 'balancing point' of the data — one big outlier can drag it far.

**Example.** {4, 6, 8, 10, 12} → Mean = 40 / 5 = 8.

---

## Median

_id: `median`_

**Formula.** Median = Middle value when data is sorted (average of two middle values if count is even)

**When.** The middle of the data — resistant to outliers.

**Memory.** Half the data below, half above. Better than mean for skewed distributions (income, home prices).

**Example.** {4, 6, 8, 10, 12} → Median = 8. {4, 6, 10, 12} → Median = (6 + 10) / 2 = 8.

---

## Mode

_id: `mode`_

**Formula.** Mode = Most frequently occurring value

**When.** Identifying the most common outcome in a dataset.

**Memory.** Not necessarily unique — a dataset can have multiple modes or no mode.

**Example.** {4, 6, 6, 8, 10} → Mode = 6.

---

## Range

_id: `range`_

**Formula.** Range = Highest value − Lowest value

**When.** Rough measure of dispersion. Series 65 sometimes offers 'range' as a distractor for standard deviation.

**Memory.** Simplest measure of spread. Doesn't tell you anything about the middle.

**Example.** {4, 6, 8, 10, 12} → Range = 12 − 4 = 8.

---

# Bond Pricing & Yields

## Current Yield (CY)

_id: `current-yield`_

**Formula.** CY = Annual Income ÷ Market Price

**When.** Quick yield check based on today's market price (not maturity or call).

**Memory.** Current yield uses the CURRENT price. Nominal (coupon) yield uses par.

**Example.** 5% bond ($50 annual coupon) trading at $950 → CY = 50 / 950 = 5.26%.

---

## Yield Hierarchy — Discount Bond

_id: `yield-hierarchy-discount`_

**Formula.** NY < CY < YTM < YTC

**When.** Ordering the four yields when a bond trades BELOW par.

**Memory.** Discount = 'cheap' = yields go UP as you look further out because you pick up the discount to par. Nominal (coupon) is fixed and lowest; YTC is highest (you get the discount fastest if called).

**Example.** 5% bond at $950, callable at $1,020: Nominal 5%, CY 5.26%, YTM ~5.7%, YTC even higher.

---

## Yield Hierarchy — Premium Bond

_id: `yield-hierarchy-premium`_

**Formula.** YTC < YTM < CY < NY

**When.** Ordering the four yields when a bond trades ABOVE par.

**Memory.** Premium = 'expensive' = yields go DOWN as you look further out because you lose the premium as bond approaches par. YTC is lowest (you lose premium fastest if called).

**Example.** 5% bond at $1,050: Nominal 5%, CY 4.76%, YTM lower still, YTC lowest of all.

---

# Convertibles & Parity

## Conversion Ratio

_id: `conversion-ratio`_

**Formula.** Conversion Ratio = Par ÷ Conversion Price

**When.** Determining how many common shares one convertible bond can be exchanged for.

**Memory.** Par ($1,000) is fixed; the conversion PRICE is the negotiated per-share exchange rate baked into the bond.

**Example.** Conversion price $40 → Conversion ratio = 1,000 / 40 = 25 shares.

---

## Conversion Price

_id: `conversion-price`_

**Formula.** Conversion Price = Par ÷ Conversion Ratio

**When.** Working backward from conversion ratio to find the implicit per-share price of conversion.

**Memory.** Just the algebraic flip of the ratio formula — same relationship.

**Example.** Conversion ratio 40 → Conversion price = 1,000 / 40 = $25 per share.

---

## Parity Price of Bond

_id: `parity-price-bond`_

**Formula.** Parity Price (Bond) = Stock's Market Price × Conversion Ratio

**When.** What the convertible bond SHOULD be worth right now if it perfectly reflects the stock's value.

**Memory.** Bond parity uses the STOCK price × ratio. Big picture: 25 shares × $42 stock = $1,050 bond parity.

**Example.** Ratio 25, stock at $42 → Bond parity = 25 × 42 = $1,050.

---

## Parity Price of Stock

_id: `parity-price-stock`_

**Formula.** Parity Price (Stock) = Bond's Market Price ÷ Conversion Ratio

**When.** What the underlying stock SHOULD be worth right now to match the bond's current price.

**Memory.** Stock parity uses the BOND price ÷ ratio. Reverse of bond parity.

**Example.** Bond at $1,050, ratio 25 → Stock parity = 1,050 / 25 = $42.

---

# Tax-Equivalent Yields

## Taxable Equivalent Yield (of a Muni)

_id: `taxable-equivalent-yield`_

**Formula.** TEY = Municipal Yield ÷ (1 − Tax Bracket)

**When.** Answering: 'What would a TAXABLE bond need to yield to match this muni after taxes?'

**Memory.** Muni-to-taxable comparison. DIVIDE muni yield → gross it up to pre-tax.

**Example.** 4% muni, 24% bracket → TEY = 4% ÷ (1 − 0.24) = 5.26%.

---

## Tax-Free Equivalent Yield (of a Corporate)

_id: `tax-free-equivalent-yield`_

**Formula.** TFEY = Corporate Yield × (1 − Tax Bracket)

**When.** Answering: 'What TAX-FREE (muni) yield would give me the same after-tax return as this corporate bond?'

**Memory.** Corporate-to-muni comparison. MULTIPLY corporate yield → shrink down to after-tax.

**Example.** 6% corporate, 24% bracket → TFEY = 6% × (1 − 0.24) = 4.56%.

---

# Margin

## Regulation T (Initial Requirement)

_id: `reg-t-initial`_

**Formula.** Initial Deposit = 50% of Purchase Price (long or short)

**When.** Setting up a new margin position. The Federal Reserve rule.

**Memory.** 50% is 'Reg T' regardless of long or short. Then FINRA maintenance (25% long, 30% short) kicks in later.

**Example.** Buy $10,000 of stock on margin → deposit $5,000 (50%).

---

## Minimum Equity to Open a Margin Account

_id: `margin-minimum-equity`_

**Formula.** Minimum Equity = $2,000 (or 100% of purchase if smaller)

**When.** Opening a new margin account. Regulatory floor.

**Memory.** $2,000 is the number to memorize. Below that, no margin account.

---

## Long Account Equity

_id: `long-account-equity`_

**Formula.** Equity = Long Market Value (LMV) − Debit Balance

**When.** Computing current equity in a long margin position.

**Memory.** In a LONG account you OWN the shares; the debit is what you borrowed. LMV goes up, equity goes up.

**Example.** LMV $10,000, debit $5,000 → Equity = $5,000.

---

## Short Account Equity

_id: `short-account-equity`_

**Formula.** Equity = Credit Balance − Short Market Value (SMV)

**When.** Computing current equity in a short margin position.

**Memory.** In a SHORT account you OWE the shares; the credit balance is proceeds + your deposit. If SMV rises, equity shrinks (bad for shorts).

**Example.** Credit $15,000, SMV $10,000 → Equity = $5,000.

---

## Long Account Maintenance Minimum

_id: `long-maintenance-minimum`_

**Formula.** Minimum Equity = 25% of LMV

**When.** FINRA's ongoing rule for LONG margin accounts. Below this triggers a maintenance call.

**Memory.** 25% for LONG (not 50% — that's the initial Reg T, this is the ongoing floor).

**Example.** LMV $10,000 → maintenance minimum equity = $2,500.

---

## Short Account Maintenance Minimum

_id: `short-maintenance-minimum`_

**Formula.** Minimum Equity = 30% of SMV

**When.** FINRA's ongoing rule for SHORT margin accounts. Shorts get a higher requirement than longs.

**Memory.** 30% for SHORT (higher than the 25% for longs because shorts have unlimited upside risk).

**Example.** SMV $10,000 → maintenance minimum equity = $3,000.

---

# Fundamental Analysis

## Net Worth (Stockholders' Equity)

_id: `net-worth`_

**Formula.** Net Worth = Assets − Liabilities

**When.** The book value of a company (or a household).

**Memory.** Fundamental accounting equation: Assets = Liabilities + Equity. Rearranged: Equity (net worth) = Assets − Liabilities.

**Example.** Assets $10M, Liabilities $6M → Net Worth = $4M.

---

## Net Working Capital

_id: `net-working-capital`_

**Formula.** Net Working Capital = Current Assets − Current Liabilities

**When.** Measure of short-term liquidity — how much cushion the company has to meet near-term obligations.

**Memory.** CURRENT (within a year) on both sides. Both a numerator and a denominator concept — used in current ratio too.

**Example.** Current assets $5M, current liabilities $3M → Net working capital = $2M.

---

## Current Ratio

_id: `current-ratio`_

**Formula.** Current Ratio = Current Assets ÷ Current Liabilities

**When.** Liquidity ratio: can the company cover its short-term bills? Above 1.0 = yes.

**Memory.** Same components as net working capital, expressed as a ratio instead of a dollar amount.

**Example.** $5M CA / $3M CL → Current ratio = 1.67.

---

## Quick Assets

_id: `quick-assets`_

**Formula.** Quick Assets = Current Assets − Inventory

**When.** A stricter liquidity measure — inventory is excluded because it may not convert to cash fast.

**Memory.** 'Quick' = liquid = strip out anything that has to be sold before it becomes cash.

**Example.** CA $5M, Inventory $1M → Quick assets = $4M.

---

## Quick Ratio (Acid Test)

_id: `quick-ratio-acid-test`_

**Formula.** Quick Ratio = (Current Assets − Inventory) ÷ Current Liabilities

**When.** Strict liquidity test that excludes inventory. Common ratio on exam.

**Memory.** 'Acid test' — the harsh version of the current ratio.

**Example.** $4M quick assets / $3M CL → Quick ratio = 1.33.

---

## Debt Service Coverage Ratio

_id: `debt-service-coverage`_

**Formula.** DSCR = Operating Income ÷ Debt Service Requirement

**When.** Assessing whether a company (or borrower) generates enough operating income to cover its debt payments.

**Memory.** Above 1.0 = can cover debt from operations. Below 1.0 = shortfall.

**Example.** Operating income $500K, debt service $400K → DSCR = 1.25.

---

## Earnings Per Share (EPS)

_id: `eps`_

**Formula.** EPS = Net Earnings ÷ Outstanding Common Shares

**When.** Per-share measure of profitability. Feeds into P/E.

**Memory.** Net earnings AFTER preferred dividends are paid — those come off the top before common gets its slice.

**Example.** Net earnings $5M, 1M shares → EPS = $5.

---

## Price-to-Earnings (P/E) Ratio

_id: `pe-ratio`_

**Formula.** P/E = Market Price ÷ Earnings Per Share

**When.** Valuation multiple — how many dollars investors pay per dollar of earnings.

**Memory.** High P/E → growth expectations (or overvalued). Low P/E → value or troubled. Compare against peers/history.

**Example.** Stock at $50, EPS $5 → P/E = 10.

---

## Dividend Yield

_id: `dividend-yield`_

**Formula.** Dividend Yield = Annual Dividend ÷ Stock Price

**When.** Income yield of a common or preferred stock.

**Memory.** Watch the 'annualize' step — if a quarterly dividend is given, multiply by 4 first.

**Example.** Quarterly div $0.50 ($2 annual), stock $40 → yield = 2/40 = 5%.

---

## Dividend Payout Ratio

_id: `dividend-payout-ratio`_

**Formula.** Dividend Payout Ratio = Dividends Paid ÷ Net Earnings

**When.** What percentage of profit the company is returning to shareholders vs. reinvesting.

**Memory.** High payout → mature, income-focused (utilities). Low payout → growth-focused (reinvesting earnings).

**Example.** Div $2M, Net Earnings $10M → Payout = 20%.

---

## Gross Margin

_id: `gross-margin`_

**Formula.** Gross Margin = (Revenue − Cost of Goods Sold) ÷ Revenue

**When.** How much of each sales dollar is left after covering the direct costs of what was sold.

**Memory.** Excludes SG&A, R&D, interest, tax — only COGS. Pure product-level profitability.

**Example.** Revenue $10M, COGS $6M → Gross Margin = 40%.

---

## Book Value Per Share

_id: `book-value-per-share`_

**Formula.** Book Value Per Share = (Net Worth − Preferred Stock Par) ÷ Common Shares Outstanding

**When.** Per-share liquidation value based on balance-sheet equity.

**Memory.** Preferred stock par comes OFF the top before common shareholders' share is computed — preferred has liquidation priority.

**Example.** Net worth $10M, preferred par $2M, 800K common shares → BV/share = 8M / 800K = $10.

---

# Fund Pricing

## Net Asset Value (NAV) Per Share

_id: `nav-per-share`_

**Formula.** NAV = (Fund Assets − Fund Liabilities) ÷ Shares Outstanding

**When.** Calculating the per-share value of a mutual fund's underlying portfolio (the bid/redemption price).

**Memory.** NAV is what the FUND is worth per share. For open-end funds, redemption always happens at NAV.

**Example.** Assets $100M, liabilities $2M, shares outstanding 5M → NAV = 98M / 5M = $19.60.

---

## Public Offering Price (POP)

_id: `public-offering-price`_

**Formula.** POP = NAV ÷ (1 − Sales Charge %)

**When.** The price a buyer pays for a load fund (NAV + sales load added).

**Memory.** You DIVIDE by (1 − load) to gross NAV up. Selling always at NAV; buying at NAV + load.

**Example.** NAV $19.60, sales charge 4.5% → POP = 19.60 / 0.955 = $20.52.

---

## Sales Charge %

_id: `sales-charge-percent`_

**Formula.** Sales Charge % = (POP − NAV) ÷ POP

**When.** Backing out the sales load when only POP and NAV are given.

**Memory.** The denominator is POP (not NAV) — that's what makes this a % of the offering price, matching the fund's disclosure.

**Example.** POP $20.52, NAV $19.60 → Sales Charge = (20.52 − 19.60) / 20.52 = 4.48%.

---

## Closed-End Fund Discount / Premium

_id: `cef-discount-premium`_

**Formula.** Discount/Premium = (Market Price − NAV) ÷ NAV

**When.** Measuring how a closed-end fund's market price compares to its underlying NAV.

**Memory.** Positive = premium (trading above NAV). Negative = discount. Open-end funds trade at NAV — never at a discount or premium.

**Example.** Market price $18, NAV $20 → (18 − 20) / 20 = −10% (10% discount).

---
