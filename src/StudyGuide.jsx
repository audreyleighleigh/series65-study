import { useState } from "react";

const CONCEPTS = [
  {
    id: "yields",
    category: "Bonds",
    title: "The Yield Hierarchy",
    color: "#E8C547",
    analogy: "Your bond is a rental unit locked at $600/mo. Market rent jumps to $800. Your unit is worth less as an asset — nobody pays full price for a below-market lease.",
    rule: "For premium bonds: YTC < YTM < Current Yield < Nominal Yield",
    watch: "Nominal yield never changes. It's baked in at issuance. Current yield = annual interest ÷ current price.",
    quiz: [
      {
        q: "5% bond trading at premium, callable at par in 10 years, matures in 15. Which is accurate?",
        options: [
          "YTM is higher than current yield",
          "YTC is higher than current yield",
          "Current yield is higher than nominal yield",
          "YTM is higher than YTC"
        ],
        answer: 3,
        explain: "Premium bond hierarchy: YTC < YTM < Current Yield < Nominal Yield. D: YTM > YTC ✓. A: YTM < current yield (wrong direction). B: YTC < current yield (wrong direction). C: current yield < nominal yield (wrong direction)."
      },
      {
        q: "A bond's yield to maturity is:",
        options: [
          "The annualized return if held to maturity",
          "Coupon rate divided by current market price",
          "Set at issuance and printed on the face of the bond",
          "The annualized return if held to call date"
        ],
        answer: 0,
        explain: "YTM = total annualized return assuming you hold to maturity, including coupon payments AND the gain/loss from buying at a discount/premium. C describes nominal yield. B describes current yield. D describes yield to call."
      },
      {
        q: "Bond with 7.5% coupon selling at 105½. Current yield is approximately:",
        options: ["8.00%", "6.50%", "7.11%", "7.50%"],
        answer: 2,
        explain: "Current yield = annual interest ÷ market price. 105½ = $1,055. Interest = 7.5% × $1,000 = $75. $75 ÷ $1,055 = 7.11%. Premium bond → current yield < coupon (7.11% < 7.5%) ✓"
      },
      {
        q: "Which indicates a bond selling at a discount?",
        options: ["7% coupon yielding 7.5%", "10% coupon yielding 9%", "5% coupon yielding 5%", "7% coupon yielding 6.5%"],
        answer: 0,
        explain: "Discount = coupon < YTM. Market demands more than the bond pays → price drops below par. A: 7% < 7.5% ✓. B: 10% > 9% = premium. C: equal = par. D: 7% > 6.5% = premium."
      },
      {
        q: "TIPS with 3.5% coupon, inflation 4%. Inflation-adjusted return?",
        options: ["4.00%", "-0.50%", "7.50%", "3.50%"],
        answer: 3,
        explain: "TIPS adjusts principal every 6 months for inflation — so inflation is already baked in. The real return is always just the coupon rate. 3.5% = 3.5%. Don't subtract inflation; that's already handled by the principal adjustment."
      },
      {
        q: "Nominal yield is lower than current yield. The bond is:",
        options: ["A high-yield bond", "Issued by an unseasoned company", "Selling at a discount", "Selling at a premium"],
        answer: 2,
        explain: "Discount bond hierarchy: nominal yield < current yield < YTM. If nominal < current, the coupon is below what the market offers, so the bond trades below par to compensate. Discount confirmed."
      },
      {
        q: "Bond: $1,000 par, 6% coupon semiannual, selling at $1,200, callable in 15 years at 105. YTC factor?",
        options: [
          "Interest payments of $30",
          "Future value of $1,200",
          "15 payment periods",
          "Present value of $1,050"
        ],
        answer: 0,
        explain: "YTC inputs: $30 semiannual coupon (6% ÷ 2 × $1,000) ✓. Current price $1,200 = present value (not future). Call price 105 = $1,050 = future value (not present). 15 years × 2 = 30 periods (not 15). Only A is correctly stated."
      },
      {
        q: "To compute YTM, all are necessary EXCEPT:",
        options: ["The maturity date", "The current market price", "The nominal yield", "The call price"],
        answer: 3,
        explain: "YTM needs: maturity date (when you get par back), current market price (what you paid), and nominal yield (coupon payments). Call price is only needed for yield to CALL — a different calculation. YTM assumes you hold to maturity."
      },
      {
        q: "Investor sells ten 5% bonds and buys ten 5¼% bonds. Yearly return increases by:",
        options: ["$2.00 per bond", "$1.50 per bond", "$2.50 per bond", "$1.00 per bond"],
        answer: 2,
        explain: "5% × $1,000 = $50/year. 5.25% × $1,000 = $52.50/year. Difference = $2.50 per bond. The profit from selling is irrelevant — the question only asks about the change in annual coupon income."
      },
      {
        q: "5% mortgage bond trading at premium, callable at par in 10 years, matures in 15. Which is accurate?",
        options: [
          "YTM is higher than current yield",
          "YTC is higher than current yield",
          "Current yield is higher than nominal yield",
          "YTM is higher than YTC"
        ],
        answer: 3,
        explain: "Premium bond hierarchy: YTC < YTM < Current Yield < Nominal Yield. D: YTM > YTC ✓. A: YTM < current yield (wrong). B: YTC < current yield (wrong). C: current yield < nominal yield (wrong)."
      },
      {
        q: "Bonds bought at par. CPI declined, current yield also declined. Bond value?",
        options: [
          "Cannot be determined",
          "Market price has declined",
          "Market price has increased",
          "Market price unchanged"
        ],
        answer: 2,
        explain: "Current yield declined = market rates fell. When rates fall, existing bonds with higher locked-in coupons become more valuable. Yield and price always move in OPPOSITE directions. Yield down → price up."
      },
      {
        q: "For a premium bond, which yield is highest?",
        options: ["YTC", "YTM", "Current Yield", "Nominal Yield"],
        answer: 3,
        explain: "Nominal yield is fixed at issuance. For premium bonds, you overpaid — so every other yield is lower."
      },
      {
        q: "Which indicates a bond selling at a discount?",
        options: ["7% coupon yielding 7.5%", "10% coupon yielding 9%", "5% coupon yielding 5%", "7% coupon yielding 6.5%"],
        answer: 0,
        explain: "Coupon < YTM → discount. Coupon > YTM → premium. Coupon = YTM → par. A: 7% < 7.5% = discount. B: 10% > 9% = premium. C: equal = par. D: 7% > 6.5% = premium."
      },
      {
        q: "Current yield is defined as:",
        options: ["Coupon ÷ Face Value", "Annual Interest ÷ Current Price", "Coupon ÷ YTM", "Face Value ÷ Market Price"],
        answer: 1,
        explain: "Annual interest divided by current market price. The earnings figure is a trap — use dividends, not earnings."
      },
      {
        q: "GHI pays $0.50 quarterly dividend, market price $40. Current yield?",
        options: ["10%", "1.25%", "5%", "15%"],
        answer: 2,
        explain: "$0.50 × 4 = $2 annual dividend. $2 ÷ $40 = 5%. Earnings are irrelevant — that's for P/E ratio."
      },
      {
        q: "A company's dividend increases 5% but market price stays the same. Current yield will:",
        options: ["Decrease", "Increase", "Remain at 5%", "Remain at 7%"],
        answer: 1,
        explain: "Current yield = dividend ÷ price. Dividend (numerator) goes up, price (denominator) stays flat → yield increases. Simple fraction math."
      },
      {
        q: "Bond: $1,000 par, 8% coupon, 5yr maturity, YTM 10%. What is today's price?",
        options: ["$1,051.23", "$1,221.17", "$1,144.31", "$922.78"],
        answer: 3,
        explain: "Coupon (8%) < YTM (10%) → market demands more than the bond pays → trades at a discount below par. Eliminate all answers above $1,000. Answer is $922.78."
      },
      {
        q: "Two bonds, both 10% coupon. Bond A matures in 3 years, Bond B in 20 years. Rates drop to 8%. Which is correct?",
        options: [
          "Both bonds will be selling at a discount",
          "The issuer will attempt to call Bond A",
          "Bond B will be selling at a greater discount than Bond A",
          "Bond B will be selling at a greater premium than Bond A"
        ],
        answer: 3,
        explain: "Rates dropped below coupon → both at premium (eliminates A & C). Issuer would call Bond B (20 years of overpaying at 10%) not Bond A (almost done). Longer maturity = amplified price response, so Bond B trades at a greater premium."
      },
      {
        q: "A bond offered at par has a coupon rate that is:",
        options: ["Less than its current yield", "Equal to its current yield", "Greater than its YTM", "Less than its YTM"],
        answer: 1,
        explain: "At par, price = face value. Current yield = annual interest ÷ price = annual interest ÷ face value = coupon rate. All three yields (nominal, current, YTM) are equal when a bond trades at par."
      },
      {
        q: "An investor buys 10M 6.6s of 10 at 67. Annual interest received?",
        options: ["$670", "$820", "$660", "$1,000"],
        answer: 2,
        explain: "10M = $10,000 face value. 6.6s = 6.6% coupon. At 67 = bought at 67% of par ($6,700). Interest = coupon rate × FACE VALUE = 6.6% × $10,000 = $660. Purchase price is irrelevant for interest calculation."
      },
      {
        q: "Which expression describes the current yield of a bond?",
        options: ["YTM ÷ par value", "Annual interest ÷ current market price", "YTM ÷ current market price", "Annual interest ÷ par value"],
        answer: 1,
        explain: "Current yield = annual interest payment ÷ current market price. Don't confuse with nominal yield (annual interest ÷ par value) or YTM (which accounts for price gain/loss to maturity)."
      },
      {
        q: "A bond offered at par has a coupon rate:",
        options: ["Less than its current yield", "Equal to its current yield", "Greater than its YTM", "Less than its YTM"],
        answer: 1,
        explain: "At par, all three yields are equal: nominal = current yield = YTM. The hierarchy only spreads apart when price deviates from par. Premium → nominal highest. Discount → YTM highest."
      }
    ]
  },
  {
    id: "stockdiv",
    category: "Equities",
    title: "Stock Dividends & Splits",
    color: "#4ECDC4",
    analogy: "Same pizza, more slices. A warehouse redrawn into more units — same square footage, more doors, each worth less. The ex-date owner gets the new slices.",
    rule: "Total position value never changes. Shares ↑, price per share ↓ proportionally.",
    watch: "The ex-date owner receives the dividend — not someone who buys on or after the ex-date.",
    quiz: [
      {
        q: "100 shares @ $25. Company declares 25% stock dividend. Result?",
        options: ["100 shares @ $25", "125 shares @ $25", "125 shares @ $20", "100 shares @ $20"],
        answer: 2,
        explain: "100 × 1.25 = 125 shares. Total value stays $2,500, so price adjusts: $2,500 ÷ 125 = $20."
      },
      {
        q: "100 shares @ $25. Company does a 2-for-1 stock split. Result?",
        options: ["50 shares @ $50", "200 shares @ $12.50", "200 shares @ $25", "100 shares @ $12.50"],
        answer: 1,
        explain: "2-for-1 doubles shares, halves price. 200 × $12.50 = $2,500. Same total value."
      }
    ]
  },
  {
    id: "affiliates",
    category: "Regulations",
    title: "Affiliate Status & Rule 144",
    color: "#FF6B6B",
    analogy: "Married couples share a storage unit. The building rule: if your combined unit holds 10%+ of the building's total stuff, you need a permit to move anything out. Both names on the lease = combined count.",
    rule: "Spouses' ownership aggregates. Combined ≥ 10% = affiliate = Form 144 required to sell.",
    watch: "It doesn't matter that he only owns 2% individually. 9% + 2% = 11% ≥ 10%.",
    quiz: [
      {
        q: "Wife owns 9%, husband owns 2% and wants to sell. Which is true?",
        options: ["Not an affiliate, no Form 144", "Affiliate, must file Form 144", "Not an affiliate, must file Form 144", "Affiliate, no Form 144 needed"],
        answer: 1,
        explain: "Spouses aggregate: 9% + 2% = 11% ≥ 10% threshold. He's an affiliate and must file Form 144 before selling."
      }
    ]
  },
  {
    id: "isos",
    category: "Tax",
    title: "ISOs vs NQSOs",
    color: "#A78BFA",
    analogy: "Grant = key to a locked door. Exercise = walking through. Sale = cashing out. The IRS shows up differently at each stage depending on option type.",
    rule: "ISO: no ordinary tax at exercise (but AMT applies). Taxed only at sale. NQSO: taxed as ordinary income at exercise — payroll, wages, employer deduction.",
    watch: "ISO favorable treatment LOST if sold before 1yr from exercise OR 2yrs from grant. AMT still hits at exercise.",
    quiz: [
      {
        q: "Which statement about ISOs is FALSE?",
        options: [
          "Long-term gain if holding period satisfied",
          "Exercise does not create taxable income",
          "Favorable treatment lost if sold < 1yr/exercise or < 2yr/grant",
          "Exercise creates income for AMT purposes"
        ],
        answer: 1,
        explain: "B is false — exercise DOES create AMT income, even though it's not regular taxable income. The question was an 'except' trap."
      }
    ]
  },
  {
    id: "bonds_features",
    category: "Bonds",
    title: "Bond Features & Borrowing Cost",
    color: "#F97316",
    analogy: "Convertible = hidden lottery ticket. Investor accepts lower coupon because they might get equity upside. Callable = issuer's get-out-of-jail card. Investor demands more yield to compensate.",
    rule: "Features that benefit investor → issuer pays less. Features that benefit issuer → issuer pays more.",
    watch: "For CONVERTIBLE bonds specifically: call protection is most valuable when the STOCK PRICE is rising — not when rates fall.",
    quiz: [
      {
        q: "Which feature lets a corporation borrow at the lowest interest rate?",
        options: ["Zero-coupon", "Cumulative", "Callable", "Convertible"],
        answer: 3,
        explain: "Convertible gives investors equity upside — they accept a lower coupon in exchange. Callable benefits the issuer, so investors demand MORE yield to compensate."
      },
      {
        q: "Unsecured long-term corporate debt is called a:",
        options: ["Collateral trust bond", "Mortgage bond", "Debenture", "Equipment trust certificate"],
        answer: 2,
        explain: "Debenture = no collateral, backed only by creditworthiness. The others have physical backing: real estate, securities, or equipment."
      },
      {
        q: "Call protection on a convertible bond is most valuable when:",
        options: ["Rates are rising", "Rates are stable", "The underlying stock price is rising", "Rates are falling"],
        answer: 2,
        explain: "Convertibles track stock price more than rates. Rising stock = company wants to call it back before you convert. Protection lets you ride the appreciation."
      },
      {
        q: "Issuing callable bonds is advantageous to the issuer because it allows the company to:",
        options: [
          "Replace a high, fixed-rate issue with a lower one after the call date",
          "Call in bonds at less than par and capture the difference",
          "Take advantage of high interest rates",
          "Issue fixed-income securities at a yield lower than usual"
        ],
        answer: 0,
        explain: "When rates fall, the company calls the expensive bond and refinances at a lower rate. Watch out for C — callable bonds are exercised when rates are LOW, not high."
      },
      {
        q: "MNO issues 30-year bonds. Which call price is most beneficial to MNO?",
        options: ["102", "104", "106", "110"],
        answer: 0,
        explain: "The issuer pays the call price to buy back bonds. Lower call price = less money out the door. 102 is cheapest for MNO. Rule: low call price = good for issuer, bad for investor. High call price = good for investor, bad for issuer."
      },
      {
        q: "Convertible bond, conversion price $125, bond trading at 80. Parity price of stock?",
        options: ["$125.00", "$64.00", "$100.00", "$156.25"],
        answer: 2,
        explain: "Step 1: conversion ratio = $1,000 ÷ $125 = 8 shares. Step 2: bond at 80 = $800. Parity price = $800 ÷ 8 = $100/share. At $100, converting gives exactly $800 — break-even with selling the bond."
      },
      {
        q: "Which is NOT true of convertible bonds?",
        options: [
          "Conversion rate is set at issuance and does not change",
          "Coupon rates are usually higher than nonconvertible bonds of same issuer",
          "Convertible bondholders are creditors of the corporation",
          "If no conversion advantage, bonds sell based on market value without convertible feature"
        ],
        answer: 1,
        explain: "Convertibles yield LESS than comparable nonconvertibles — the investor accepts lower coupon in exchange for equity upside. B has it backwards. A is actually also arguable (antidilution adjusts conversion), but B is the clearest false statement."
      },
      {
        q: "3% convertible debenture, conversion price $40, trading at 126. Most probable reason?",
        options: [
          "Common stock is ~$35/share",
          "Interest rates have risen",
          "Earnings have risen",
          "Common stock is ~$50/share"
        ],
        answer: 3,
        explain: "Conversion ratio = $1,000 ÷ $40 = 25 shares. At $50/share: 25 × $50 = $1,250 conversion value ≈ bond price of $1,260 ✓. At $35: 25 × $35 = $875 — no reason to trade at $1,260. Convertible bond price tracks the stock."
      },
      {
        q: "Which is true of callable bonds?",
        options: [
          "They offer lower yields than comparable noncallable bonds",
          "They usually provide a call risk premium",
          "They are only issued by government entities",
          "They are unaffected by changes in market yields"
        ],
        answer: 1,
        explain: "Callable bonds carry call risk — the bond can be yanked away when rates fall. Investors demand a higher yield (call risk premium) to compensate. Callables yield MORE than comparable noncallables, not less."
      },
      {
        q: "Convertible debenture converts into 20 shares. After 2-for-1 split, converts into 40 shares. Why?",
        options: ["Preemptive rights", "Par value increased to $2,000", "Warrants attached", "Antidilution clause"],
        answer: 3,
        explain: "Antidilution clause protects convertible bondholders from corporate actions like splits. Terms automatically adjust so the bondholder isn't diluted — 20 shares becomes 40 after a 2-for-1 split."
      },
      {
        q: "Convertible bond at $1,000 par, convertible at $83.33/share. Conversion ratio?",
        options: ["1.2 shares", "2 shares", "12 shares", "8 shares"],
        answer: 2,
        explain: "$1,000 ÷ $83.33 = 12 shares. Formula: par value ÷ conversion price = conversion ratio."
      }
    ]
  },
  {
    id: "discount",
    category: "Bonds",
    title: "Discount vs Interest-Bearing",
    color: "#34D399",
    analogy: "Two vending machines: Discount machine — put in $97, get $100 at the end (gap is your return). Interest machine — put in $100, it pays you coins along the way AND returns $100.",
    rule: "Pays explicit interest → NOT a discount instrument. Return baked into price gap → discount instrument.",
    watch: "GNMA pays monthly (mirrors mortgage payments). T-bills, zero-coupon, commercial paper = discount. Jumbo CDs = interest-bearing.",
    quiz: [
      {
        q: "General characteristics of negotiable jumbo CDs?",
        options: [
          "Always mature in 1-2 years with prepayment penalty",
          "Issued in amounts of $100,000 to $1 million or more",
          "Trade only in the primary market",
          "Typically pay interest monthly"
        ],
        answer: 1,
        explain: "Jumbo CDs: minimum $100,000, up to $1M+. They're negotiable = trade in secondary market (not primary only). No prepayment penalty since they're tradeable. Interest paid at maturity, not monthly."
      },
      {
        q: "Money market instruments are:",
        options: ["Long-term debt", "Short-term debt", "Intermediate debt", "Long-term equity"],
        answer: 1,
        explain: "Money market = short-term debt maturing in one year or less. T-bills, commercial paper, Jumbo CDs are all money market instruments. Long-term = capital market."
      },
      {
        q: "Which is NOT a money market instrument?",
        options: ["Treasury bills", "Commercial paper", "Banker's acceptances", "Newly issued Treasury notes"],
        answer: 3,
        explain: "Money market = maturity ≤ 1 year. T-bills, commercial paper, and banker's acceptances all qualify. Treasury notes mature in 2–10 years = capital market, not money market."
      },
      {
        q: "To be considered a negotiable CD, a CD must have a face value of at least:",
        options: ["$100,000", "$500,000", "$1 million", "$25,000"],
        answer: 0,
        explain: "Negotiable (Jumbo) CDs require a minimum of $100,000. This makes them tradeable in the secondary market, unlike regular bank CDs."
      },
      {
        q: "Which is UNLIKELY to be issued at a discount?",
        options: ["Zero-coupon bond", "Commercial paper", "Treasury bill", "Jumbo CD"],
        answer: 3,
        explain: "Jumbo CDs pay explicit interest on top of your deposit. Discount instruments bake the return into the price gap — CDs don't work that way."
      },
      {
        q: "Which does NOT pay interest semiannually?",
        options: ["Treasury note", "Public utility bond", "GNMA", "Treasury bond"],
        answer: 2,
        explain: "GNMA passes through mortgage payments — homeowners pay monthly, so GNMA pays monthly. Everything else listed pays semiannually."
      }
    ]
  },
  {
    id: "municipal",
    category: "Regulations",
    title: "Municipal Securities & Tax Equivalence",
    color: "#60A5FA",
    analogy: "Municipal = government address on the envelope. State, city, toll authority — all count. A private company with 'full faith and credit' language is still just a corporate bond.",
    rule: "Muni = government issuer only. Tax-equiv yield = corporate yield × (1 - tax rate).",
    watch: "Munis pay less but are tax-free federally. The formula finds the muni yield that nets the same after-tax income.",
    quiz: [
      {
        q: "Which is NOT a municipal security?",
        options: ["NJ Turnpike revenue bond", "City of Atlanta library bond", "Illinois Tool Company debt", "State of Texas GO bond"],
        answer: 2,
        explain: "Illinois Tool Company is a private corporation. Municipal = government issuer only — state, city, or government authority."
      },
      {
        q: "Client in 35% bracket owns 7% corporate bonds. Equivalent muni yield?",
        options: ["7.00%", "9.45%", "2.45%", "4.55%"],
        answer: 3,
        explain: "7% × (1 - 0.35) = 7% × 0.65 = 4.55%. The muni pays less but tax-free income nets the same after-tax result."
      },
      {
        q: "Municipal bonds are called 'tax-exempts.' This refers to exemption from:",
        options: ["State, federal, and inheritance taxes", "Federal income taxes", "Federal estate taxes", "State income taxes"],
        answer: 1,
        explain: "Munis are always exempt from federal income tax. State tax treatment varies — your own state's bonds are often exempt too, but that's not universal. The guaranteed, always-true exemption is federal income tax only."
      },
      {
        q: "Which gives highest after-tax income to a client in the 35% bracket?",
        options: ["8% corporate debenture", "6% Treasury bond", "5% general obligation muni", "7% Canadian provincial bond"],
        answer: 0,
        explain: "After-tax: A = 8% × 0.65 = 5.2%, B = 6% × 0.65 = 3.9%, C = 5% tax-free muni, D = 7% × 0.65 = 4.55%. The 8% corporate wins at 5.2%. Don't assume the muni always wins — run the math every time."
      },
      {
        q: "New 5% debentures issued at par. Outstanding 4% debentures from 2 years ago. Which is true about the 4% issue?",
        options: ["II and III: price below par, current yield above coupon", "I and III: price above par, current yield above coupon", "II and IV: price below par, current yield below coupon", "I and IV: price above par, current yield below coupon"],
        answer: 0,
        explain: "4% coupon vs 5% market rate → discount → price below par (II ✓). Current yield = coupon ÷ price. Price dropped, coupon fixed → smaller denominator → current yield HIGHER than coupon (III ✓). Discount bond: price ↓, current yield ↑ relative to coupon."
      },
      {
        q: "28% bracket investor: 8% muni vs 10% corporate. Which has higher after-tax yield?",
        options: [
          "Municipal yield is higher than corporate after taxes",
          "Corporate yield is higher than municipal after taxes",
          "Yield difference cannot be determined",
          "Yields are equivalent after taxes"
        ],
        answer: 0,
        explain: "Corporate after-tax: 10% × (1 - 0.28) = 7.2%. Muni stays at 8% (federal tax exempt). 8% > 7.2% → muni wins. Always run the math — don't assume either bond wins without calculating."
      },
      {
        q: "Formula used to compare muni yield to taxable yield is called:",
        options: ["Tax-equivalent yield", "Discounted cash flow", "Inflation-adjusted return", "After-tax rate of return"],
        answer: 0,
        explain: "Tax-equivalent yield = muni coupon ÷ (1 - tax rate). This answers: 'What taxable yield would I need to match this muni?' Complement of tax rate = (1 - tax rate). The flip formula is: muni yield × (1 - tax rate) = after-tax equivalent."
      },
      {
        q: "Which project is most likely financed by a GO bond rather than a revenue bond?",
        options: ["Public golf course", "Airport expansion", "Public library", "Municipal hospital"],
        answer: 2,
        explain: "GO bonds fund projects with no revenue stream — repaid by taxes. Revenue bonds fund user-fee projects. Golf course, airport, hospital all charge users. Public library = free = no revenue = GO bond."
      },
      {
        q: "Railroad holding company transfers subsidiary's common stock to a trustee to secure debt. This is:",
        options: ["Collateral trust certificates", "Secured income notes", "Equipment trust certificates", "Guarantee trust bonds"],
        answer: 0,
        explain: "Collateral trust certificates = bonds backed by securities (stocks/bonds) held in trust. Equipment trust = physical equipment. Mortgage bond = real estate. Stock transferred to trustee = securities as collateral = collateral trust."
      },
      {
        q: "Advantage of a municipal GO bond over a revenue bond:",
        options: [
          "A GO bond generally involves less risk to the investor",
          "A GO bond is not charged against borrowing limits",
          "GO bond issuer must conduct a feasibility study",
          "Only a facility's users pay for a GO bond"
        ],
        answer: 0,
        explain: "GO bonds are backed by the full taxing power of the municipality — they can raise taxes to pay bondholders. Revenue bonds only pay if the specific project generates enough revenue. Taxing power > revenue stream = less risk."
      },
      {
        q: "28% bracket. Which produces highest after-tax yield?",
        options: ["Treasury note 7%", "AAA debenture 7.75%", "Municipal bond 6%", "Corporate mortgage bond 8%"],
        answer: 2,
        explain: "A: 7% × 0.72 = 5.04%. B: 7.75% × 0.72 = 5.58%. C: 6% muni = 6% (federal tax exempt). D: 8% × 0.72 = 5.76%. Muni wins at 6% despite lowest stated yield. Always calculate — never assume the highest stated yield wins."
      }
    ]
  },
  {
    id: "liquidation",
    category: "Equities",
    title: "Liquidation Priority",
    color: "#FB7185",
    analogy: "A sinking building — creditors escape first, owners last. Bondholders lent money (creditors). Stockholders own the company (owners). You get paid back in the order you have a claim.",
    rule: "Secured creditors → Bondholders → Preferred stockholders → Common stockholders",
    watch: "Preferred stockholders come BEFORE common but AFTER all debt holders. Board members have no special claim.",
    quiz: [
      {
        q: "In the event of insolvency, which has first claim on assets?",
        options: ["Common stockholders", "Preferred stockholders", "Board of directors", "Bondholders"],
        answer: 3,
        explain: "Liquidation order: secured creditors → bondholders → preferred stockholders → common stockholders. Debt always before equity. Bondholders lent money; stockholders own the company. Owners are always last."
      },
      {
        q: "Advantage of owning common stock compared to bonds?",
        options: [
          "Bonds must be surrendered at maturity or call; stock can be held as long as desired",
          "Bonds have priority over equity in liquidation",
          "There is limited liability",
          "Income payments are more reliable"
        ],
        answer: 0,
        explain: "Bonds terminate — they mature or get called on the issuer's timeline. Common stock can be held indefinitely. D is wrong — bond coupons are MORE reliable than stock dividends (which can be cut). B is an advantage of bonds, not stocks."
      }
    ]
  },
  {
    id: "suitability",
    category: "Suitability",
    title: "Client Suitability & STRIPS",
    color: "#FB923C",
    analogy: "STRIPS are the zero-coupon vending machine — put money in, get a lump sum later. Great for accumulation, terrible for someone who needs cash flow now.",
    rule: "STRIPS = zero-coupon = no periodic income. Wrong for income-seeking clients. Right for growth/accumulation.",
    watch: "'Antipodal' = opposite of. Read carefully what the client actually wants before matching to a product.",
    quiz: [
      {
        q: "Client wants maximum current income regardless of risk. Most suitable mutual fund?",
        options: ["GHI Index Fund", "JKL Municipal Bond Fund", "ABC Growth and Income Fund", "DEF High-Yield Bond Fund"],
        answer: 3,
        explain: "'Regardless of risk' is the tell — it unlocks junk bonds. High-yield (junk) bond funds pay the most current income because of their high risk. Without that phrase, munis or investment-grade might win. Index = market return. Munis = lower yield. Growth & income = balanced."
      },
      {
        q: "Which security is most commonly recommended to fund a child's college education?",
        options: ["Municipal bonds", "Treasury bills", "Zero-coupon Treasury bonds", "Investment-grade corporate bonds"],
        answer: 2,
        explain: "Zero-coupon Treasuries: (1) U.S. government guaranteed, (2) return locked in at purchase — no reinvestment risk, (3) lump sum at maturity — you know exactly how much you'll have on tuition day. T-bills too short-term. Munis/corporates have reinvestment risk."
      },
      {
        q: "Retired woman needs monthly income. Which is LEAST suitable?",
        options: ["Treasury bonds", "Jumbo CDs", "Treasury STRIPS", "Public utility stock"],
        answer: 2,
        explain: "STRIPS are zero-coupon — no periodic payments, just a lump sum at maturity. She needs income. T-bonds, CDs, and utility stocks all pay regular income. STRIPS don't."
      },
      {
        q: "Client has $100,000 for maximum current income. Which offers highest current return?",
        options: [
          "$100,000 corporate bonds at premium, 6% YTM",
          "$100,000 zero-coupon bonds, 6% YTM",
          "$100,000 AA corporate bonds at par, 6% coupon",
          "$200,000 utility stock paying 3.5% dividend"
        ],
        answer: 0,
        explain: "Premium bond = coupon HIGHER than market rate (that's why it trades above par). So A's coupon > 6%, generating more current income than C's exactly 6%. Eliminate B (zero-coupon = no current income) and D (can't buy $200k with $100k). Premium bond wins because its high coupon is the reason it sells at a premium."
      },
      {
        q: "Preferred stock pays $0.53 quarterly dividend. Client wants 6% ROI. Purchase price?",
        options: ["$22.55", "$50.00", "$35.33", "$8.83"],
        answer: 2,
        explain: "Annual dividend = $0.53 × 4 = $2.12. Price = annual dividend ÷ target yield = $2.12 ÷ 0.06 = $35.33. Same current yield formula, solving for price instead of yield."
      },
      {
        q: "TIPS bond $1,000 par, 3.5% coupon, 6% annual inflation. Principal value after 4 years?",
        options: ["$1,344", "$1,300", "$1,240", "$1,262"],
        answer: 3,
        explain: "TIPS adjusts principal by inflation annually (compounded). $1,000 × 1.06⁴ = $1,262. Year by year: $1,060 → $1,123.60 → $1,191.02 → $1,262.48."
      }
    ]
  },
  {
    id: "creditratings",
    category: "Bonds",
    title: "Credit Ratings & Junk Bonds",
    color: "#F43F5E",
    analogy: "Think of the rating ladder like a building. Investment grade = floors 4 and up (BBB, A, AA, AAA). Junk = floors 1-3 (BB, B, CCC, CC, C, D). BBB is the ground floor of investment grade. BB is the top floor of junk.",
    rule: "Investment grade: AAA → AA → A → BBB. Junk (high-yield): BB → B → CCC → CC → C → D. The line is between BBB and BB.",
    watch: "BB is the HIGHEST junk rating, not CCC. CCC is near the bottom of the junk pile. 'Highest rating that applies to junk' = BB.",
    quiz: [
      {
        q: "Which is the highest rating that would apply to a junk bond?",
        options: ["CC", "CCC", "BB", "BBB"],
        answer: 2,
        explain: "BBB is the lowest investment grade. BB is the highest junk/high-yield rating — just one notch below investment grade. CCC and CC are much deeper into junk territory."
      },
      {
        q: "Which would most likely increase a bond's liquidity?",
        options: ["A lower rating", "A higher rating", "No call protection", "A longer maturity"],
        answer: 1,
        explain: "Higher rating = more buyers willing to hold it = easier to sell = more liquid. Lower rating, longer maturity, and no call protection all shrink the pool of willing buyers."
      }
    ]
  },
  {
    id: "govtsecurities",
    category: "Bonds",
    title: "Treasuries vs Agency Issues",
    color: "#818CF8",
    analogy: "Treasury = loan directly to the federal government, backed by its full faith and credit. Agency = loan to a government-sponsored entity (GNMA, FNMA). Similar neighborhood, but not the same building. The slightly weaker guarantee means you get paid a bit more.",
    rule: "Agency issues yield MORE than Treasuries because they lack direct government backing. Both are taxable at the federal level.",
    watch: "Don't confuse 'no direct backing' with 'no backing at all.' Agencies have implied/indirect support — just not an explicit Treasury guarantee.",
    quiz: [
      {
        q: "Which indicates a bond selling at a discount?",
        options: ["7% coupon yielding 7.5%", "10% coupon yielding 9%", "5% coupon yielding 5%", "7% coupon yielding 6.5%"],
        answer: 0,
        explain: "Discount = coupon < YTM. A: 7% < 7.5% ✓. B: 10% > 9% = premium. C: equal = par. D: 7% > 6.5% = premium."
      },
      {
        q: "TIPS with 3.5% coupon, inflation 4%. Inflation-adjusted return?",
        options: ["4.00%", "-0.50%", "7.50%", "3.50%"],
        answer: 3,
        explain: "TIPS adjusts principal every 6 months for inflation — so inflation is already baked in. The real return is always just the coupon rate. 3.5% = 3.5%. Don't subtract inflation; that's already handled."
      },
      {
        q: "Customer wants debt income that keeps pace with inflation and offers tax advantages. Best recommendation?",
        options: ["GNMAs", "TIPS", "U.S. T-bills", "ADRs"],
        answer: 1,
        explain: "TIPS: principal adjusts with inflation (keeps pace) AND interest is exempt from state/local taxes (tax advantage). T-bills are discount instruments with no inflation protection. GNMAs and ADRs don't meet either criterion."
      },
      {
        q: "Treasury bills are:",
        options: ["Issued in book-entry form", "Issued in bearer form", "Callable", "Issued at par"],
        answer: 0,
        explain: "All Treasury securities are issued in book-entry form — no physical certificate, ownership recorded electronically. T-bills are issued at a discount (never at par) and are never callable."
      },
      {
        q: "Investor pays 95.28 for a Treasury bond. How much did it cost?",
        options: ["$958.75", "$950.28", "$95.28", "$9,528.00"],
        answer: 0,
        explain: "Treasury bonds quoted as percentage of par plus 32nds. 95.28 = $950 plus 28/32 of $10 (one point = $10). 28/32 × $10 = $8.75. $950 + $8.75 = $958.75. Trap: reading .28 as cents gives $952.80 — wrong."
      },
      {
        q: "Investor buys 10 corporate bonds at 102¼ each. Total cost?",
        options: ["$10,225.00", "$10,202.50", "$1,020.25", "$1,022.50"],
        answer: 0,
        explain: "Corporate bonds use regular decimals (not 32nds). 102¼ = 102.25% of $1,000 = $1,022.50 per bond. 10 × $1,022.50 = $10,225.00."
      },
      {
        q: "Which agency has explicit U.S. government guarantee?",
        options: ["Freddie Mac", "Fannie Mae", "Ginnie Mae", "Federal Home Loan Bank"],
        answer: 2,
        explain: "Ginnie Mae (GNMA) is a government-owned corporation with explicit full faith and credit backing. Fannie Mae, Freddie Mac, and Federal Home Loan Bank are GSEs — privately owned with only implied government support."
      },
      {
        q: "U.S. government agency issues differ from Treasury issues in that agency issues:",
        options: [
          "Frequently trade on NYSE while Treasuries never do",
          "Are more likely to be issued in larger amounts",
          "Typically carry higher returns due to lack of direct government backing",
          "Are taxable at the federal level while Treasury issues are not"
        ],
        answer: 2,
        explain: "Agencies lack direct full faith and credit backing → slightly more risk → higher yield to compensate. Both Treasuries AND agencies are taxable federally. D has the tax piece backwards."
      }
    ]
  },
  {
    id: "sovereign",
    category: "Global",
    title: "Sovereign Debt & Bond Sensitivity",
    color: "#F472B6",
    analogy: "Sovereign = a country's name on the bond. Longer maturity = more exposure to rate changes, like being locked into a lease for 30 years vs 5. CDs don't get repriced because they're not traded.",
    rule: "Sovereign debt = national government issuer. Longer maturity = more interest rate sensitive. CDs = least sensitive (not traded).",
    watch: "The CD question: even a nearly-mature Treasury bond gets marked to market. A CD sitting at the bank does not.",
    quiz: [
      {
        q: "Individual buys $10,000 CD with 5-year maturity from local bank. She is eliminating:",
        options: ["Purchasing power risk", "Opportunity cost", "Interest rate risk", "Inflation risk"],
        answer: 2,
        explain: "CDs are not traded on exchanges — they can't be repriced by the market, so they eliminate interest rate risk. They do NOT eliminate inflation risk (fixed return loses purchasing power if inflation rises). A and D are actually risks CDs carry, not eliminate."
      },
      {
        q: "An investor in sovereign debt would most likely buy:",
        options: ["Sweden 2.5s of 2032", "European Central Bank debt", "Bank of the United States bonds", "Bonds backed by gold sovereigns"],
        answer: 0,
        explain: "Sweden is a sovereign nation. ECB is an institution, not a country. 'Bank of the United States' doesn't exist. Gold sovereigns are coins."
      },
      {
        q: "Advantage of Brady bonds over bonds from emerging economies?",
        options: ["Shorter maturities", "Increased liquidity", "Greater risk", "Higher yields"],
        answer: 1,
        explain: "Brady bonds = sovereign debt from developing countries collateralized by U.S. Treasuries. That backing makes them more standardized and attractive to more buyers = more liquid than raw emerging market debt. They carry LESS risk and LOWER yields than plain emerging market bonds."
      },
      {
        q: "Which risk is avoided when a U.S. resident buys a Eurodollar bond?",
        options: ["Interest rate risk", "Inflation risk", "Currency risk", "Default risk"],
        answer: 2,
        explain: "Eurodollar bonds are denominated in USD but issued outside the U.S. Since they're priced in dollars, U.S. investors have no currency conversion exposure. Interest rate, inflation, and default risks still apply normally."
      },
      {
        q: "Which best describes a Yankee bond?",
        options: [
          "USD bond issued by a non-U.S. entity inside the U.S.",
          "USD bond issued by a non-U.S. entity outside the U.S.",
          "USD bond issued by a U.S. entity outside the U.S.",
          "USD bond issued by a U.S. entity inside the U.S."
        ],
        answer: 0,
        explain: "Yankee bond = foreign issuer, U.S. market, U.S. dollars. Foreign team playing in an American stadium. B describes a Eurodollar bond (USD outside U.S.). C describes a bond issued abroad by a U.S. company."
      },
      {
        q: "Benefit of adding foreign debt securities to a portfolio?",
        options: ["Potentially higher yields", "Reduced taxation", "Potentially higher risk", "Receiving income in foreign currency"],
        answer: 0,
        explain: "Foreign debt often yields more than domestic to compensate for currency and political risk. The higher yield is the benefit. Higher risk (C) and foreign currency income (D) are drawbacks/risks, not benefits."
      },
      {
        q: "Which is LEAST likely to be impacted by interest rate changes?",
        options: ["A bank CD maturing in 5 years", "A laddered bond portfolio", "A convertible preferred stock", "A Treasury bond issued 25 years ago with 30-yr maturity"],
        answer: 0,
        explain: "CDs aren't traded on exchanges so they don't get repriced when rates move. Bonds — even nearly-mature ones — are marked to market continuously."
      }
    ]
  },
  {
    id: "share-classes",
    title: "Mutual Fund Share Classes",
    category: "Investment Companies",
    color: "#7C3AED",
    analogy: "Think of share classes as three entrance tickets to the same museum. Class A charges at the door (upfront) but discounts for large groups. Class B charges when you leave — but the fee shrinks the longer you stay. Class C charges a small annual membership fee that never goes away.",
    rule: "Class A = front-end load (breakpoints reduce it for large purchases). Class B = CDSC (deferred load that declines over time, then converts to Class A). Class C = level load (small annual 12b-1 fee each year, no conversion). No single class is always best — depends on investment amount and time horizon.",
    watch: "Don't confuse which load applies when. Front-end (A) is paid at purchase. Back-end (B) is paid at redemption. Level (C) is paid every year. Long hold + large investment → Class A. Short hold → Class C. Class B is rarely recommended today.",
    quiz: [
      {
        q: "An investor purchases $50,000 of a mutual fund and pays a 4.5% sales charge at the time of purchase. Which share class did they buy?",
        options: ["Class A", "Class B", "Class C", "Class D"],
        answer: 0,
        explain: "Class A shares charge a front-end load at purchase. Class B charges a back-end (CDSC) when you sell. Class C uses a level annual 12b-1 fee. Class D is not a standard retail share class."
      },
      {
        q: "A Class B mutual fund share has a CDSC that declines from 5% to 0% over 6 years, then converts to Class A. What does CDSC stand for?",
        options: ["Contingent Deferred Sales Charge", "Compounded Deferred Sales Commission", "Conditional Deferred Share Cost", "Contracted Deferred Selling Cost"],
        answer: 0,
        explain: "CDSC = Contingent Deferred Sales Charge. It is 'contingent' because you only pay it if you sell before the holding period ends. It declines each year and eventually drops to zero."
      },
      {
        q: "Which share class is generally most suitable for a short-term investor who wants to avoid a large upfront or backend charge?",
        options: ["Class A", "Class B", "Class C", "Institutional"],
        answer: 2,
        explain: "Class C has no front-end load and no long-term CDSC (usually just a 1-year redemption fee). Its ongoing 12b-1 fee makes it expensive long-term, but for short holding periods it avoids the large load hits of A or B."
      },
      {
        q: "Which mutual fund share class typically offers breakpoints that reduce the sales load?",
        options: ["Class C", "Class B", "Class A", "All share classes equally"],
        answer: 2,
        explain: "Class A shares offer breakpoints — the front-end load percentage decreases as the investment amount increases. Class B and C do not have front-end loads, so breakpoints don't apply to them."
      }
    ]
  },
  {
    id: "open-closed-end",
    title: "Open-End vs. Closed-End Funds",
    category: "Investment Companies",
    color: "#7C3AED",
    analogy: "Open-end is like a hotel — they'll always add a room for you, and you can always check out at the official room rate. Closed-end is like a co-op apartment building with a fixed number of units — to get in, you buy from someone who wants out, and the price depends on supply and demand.",
    rule: "Open-end (mutual fund): continuously issues/redeems shares at NAV, priced once daily after market close. Closed-end: fixed share count after IPO, trades on exchange intraday, price set by supply/demand — can trade at a discount OR premium to NAV.",
    watch: "Closed-end funds can trade at persistent discounts or premiums to NAV — the market price differs from the underlying value. Open-end funds always transact at NAV. Closed-end ≠ ETF: closed-end funds have no arbitrage mechanism to force price back to NAV.",
    quiz: [
      {
        q: "An investor wants to buy shares in a fund that trades on the NYSE throughout the day. What type of fund is this?",
        options: ["Open-end mutual fund", "Closed-end fund", "Unit investment trust", "Money market fund"],
        answer: 1,
        explain: "Closed-end funds are listed on exchanges and trade intraday like stocks. Open-end mutual funds only price at NAV once per day after the close and are bought/redeemed through the fund company, not on an exchange."
      },
      {
        q: "A closed-end fund has a NAV of $20 but is trading at $18 on the NYSE. The fund is trading at:",
        options: ["A premium of $2", "A discount of $2", "Par value", "An arbitrage spread"],
        answer: 1,
        explain: "When the market price is below NAV, the fund trades at a discount. When above NAV, it's a premium. Closed-end funds frequently trade at discounts due to supply/demand and investor sentiment."
      },
      {
        q: "Which statement about open-end mutual funds is TRUE?",
        options: ["They trade intraday on stock exchanges", "Their share count is fixed after the IPO", "They are redeemed at NAV directly with the fund company", "They commonly use leverage to boost returns"],
        answer: 2,
        explain: "Open-end funds redeem shares at NAV directly with the fund — you don't sell to another investor. They do not trade on exchanges, do not have a fixed share count, and use leverage less commonly than closed-end funds."
      },
      {
        q: "A mutual fund's NAV is calculated:",
        options: ["Continuously throughout the trading day", "Once daily after market close", "Weekly on Friday", "Only when a purchase order is submitted"],
        answer: 1,
        explain: "Open-end mutual fund NAV is computed once per day after the markets close (typically 4 PM ET). All buy and sell orders submitted that day are executed at that closing NAV (forward pricing rule)."
      }
    ]
  },
  {
    id: "etfs",
    title: "Exchange-Traded Funds (ETFs)",
    category: "Investment Companies",
    color: "#7C3AED",
    analogy: "An ETF is like a closed-end fund with a pressure valve. Whenever the price drifts from NAV, big institutional traders (authorized participants) pump it back by creating or redeeming large blocks of shares. Closed-end funds have no such valve — they can trade at a 15% discount for years.",
    rule: "ETFs trade intraday on exchanges. Authorized participant creation/redemption arbitrage keeps ETF price close to NAV. Usually passively managed (index-tracking), very low expense ratios. Tax-efficient via in-kind redemptions. Can be bought on margin or sold short.",
    watch: "ETFs and closed-end funds both trade on exchanges — but only ETFs have the authorized participant mechanism. This is why ETFs rarely stray far from NAV while closed-end funds often trade at deep discounts. Most ETFs are passive, not actively managed.",
    quiz: [
      {
        q: "What mechanism prevents ETF market prices from straying far from their NAV?",
        options: ["SEC price controls", "Authorized participant arbitrage via in-kind creation/redemption", "Daily NAV repricing by the fund manager", "Exchange circuit breakers"],
        answer: 1,
        explain: "Authorized participants (large institutions) can create or redeem large blocks of ETF shares (called 'creation units') by delivering or receiving the underlying basket of securities. This arbitrage keeps ETF market prices very close to NAV."
      },
      {
        q: "Compared to actively managed mutual funds, most ETFs have lower costs primarily because they:",
        options: ["Have higher trading volume", "Are passively managed and track an index", "Are exempt from SEC registration", "Invest only in large-cap stocks"],
        answer: 1,
        explain: "Most ETFs passively track an index, requiring minimal portfolio management decisions. This passive management results in very low expense ratios. Trading volume affects bid-ask spreads but not the fund's internal expense ratio."
      },
      {
        q: "Which of the following is an advantage of ETFs over traditional mutual funds for taxable accounts?",
        options: ["ETFs guarantee higher returns", "In-kind redemptions reduce capital gains distributions", "ETFs are not subject to market risk", "ETF dividends are tax-free"],
        answer: 1,
        explain: "When ETF shares are redeemed, the fund delivers securities in-kind rather than selling them, so no taxable capital gains are triggered inside the fund. Traditional mutual funds must sell securities to meet redemptions, creating distributions taxed to remaining shareholders."
      }
    ]
  },
  {
    id: "ica1940",
    title: "Investment Company Act of 1940",
    category: "Investment Companies",
    color: "#7C3AED",
    analogy: "The ICA 1940 is the rulebook for any company whose core business IS investing — its portfolio IS the product. It draws a box around three types of these companies and sets strict rules for how they operate and protect shareholders.",
    rule: "ICA 1940 governs investment companies — entities that invest and offer their own shares to the public. Three types: (1) Face-Amount Certificate Companies (fixed periodic payments), (2) Unit Investment Trusts (fixed portfolio, no board, redeemable units), (3) Management Companies (open-end = mutual funds; closed-end = fixed-share exchange-traded).",
    watch: "REITs and hedge funds are NOT investment companies under ICA 1940. The three ICA types are face-amount certificate, UIT, and management company. UITs have NO board of directors and NO active management — that's their defining feature.",
    quiz: [
      {
        q: "Under the Investment Company Act of 1940, which type of investment company issues redeemable shares and has a fixed portfolio with no board of directors?",
        options: ["Open-end management company", "Closed-end management company", "Unit investment trust", "Face-amount certificate company"],
        answer: 2,
        explain: "UITs issue redeemable units against a fixed, unmanaged portfolio of securities. There is no board of directors and no ongoing active management. The portfolio is assembled once and held to maturity or termination."
      },
      {
        q: "Which of the following is classified as an open-end management company under the ICA of 1940?",
        options: ["A closed-end fund trading on NYSE", "A traditional mutual fund", "An exchange-traded fund", "A real estate investment trust"],
        answer: 1,
        explain: "Open-end management companies continuously issue and redeem shares at NAV — the classic structure of a traditional mutual fund. Closed-end funds have fixed share counts. ETFs have a unique structure. REITs are not classified as management companies."
      }
    ]
  },
  {
    id: "fund-exchange",
    title: "Fund Exchange Privileges & Switching",
    category: "Investment Companies",
    color: "#7C3AED",
    analogy: "Exchanging funds within a family feels like moving money from your right pocket to your left — no cash changes hands. But the IRS sees it differently: you sold your right-pocket asset, realized the gain, and bought a new left-pocket asset. The tax collector doesn't care how convenient it felt.",
    rule: "Exchange privilege = moving between funds in the same family at NAV, no new sales load charged. However, the IRS treats it as a taxable event — the sale of the original fund is a realized gain reportable on your return. Registered reps must disclose this. Frequent switching may also trigger market-timing restrictions.",
    watch: "The #1 trap: 'no cash received = no taxable event.' WRONG. An exchange is always a taxable sale regardless of whether cash was withdrawn. This is a key disclosure requirement for registered representatives.",
    quiz: [
      {
        q: "An investor exchanges shares of a growth fund for shares of a bond fund within the same fund family. Which statement is TRUE?",
        options: ["The exchange is tax-free because no cash was received", "The exchange is a taxable event — any capital gain must be reported", "The investor must pay a new front-end load on the bond fund", "The exchange is only taxable if held less than one year"],
        answer: 1,
        explain: "The IRS treats a fund exchange as a sale of the original fund and a purchase of the new one. Any gain realized on the original fund is taxable, even if no cash was withdrawn. This is a key disclosure point for registered representatives."
      },
      {
        q: "What is the primary benefit of an exchange privilege offered within a mutual fund family?",
        options: ["Guaranteed higher returns in the new fund", "Ability to move between funds at NAV without paying a new sales load", "Avoidance of capital gains taxes on any appreciation", "Priority redemption rights in the new fund"],
        answer: 1,
        explain: "Exchange privileges let investors reallocate among funds in the family at NAV — no new front-end load is charged. The tax benefit does NOT apply; gains are still taxable. This is a convenience feature, not a tax shelter."
      }
    ]
  },
  {
    id: "pe-vs-vc",
    title: "Private Equity vs. Venture Capital",
    category: "Investment Companies",
    color: "#7C3AED",
    analogy: "VC is a seed investor betting that one of ten plants will become a redwood. PE is a landscaping company — they buy established properties using borrowed money, prune them aggressively, and flip them for profit. Different stages, different tools, different risk profiles.",
    rule: "Venture Capital = early-stage startups, minority stakes, high failure rate, moonshot return potential. Private Equity = mature companies, controlling/majority stakes, heavy leverage (LBOs), value via operational improvement then exit. Both: illiquid, long horizon, accredited/institutional investors only.",
    watch: "VC does NOT use leverage on portfolio companies the way PE does. PE does NOT typically fund early startups. LBO in a question → PE. Startup funding rounds → VC. Both are private and illiquid — neither offers daily redemptions.",
    quiz: [
      {
        q: "A fund takes a controlling stake in a mature manufacturing company using significant debt financing, restructures operations, and plans to sell it in 5 years. This best describes:",
        options: ["Venture capital", "A leveraged buyout by a private equity firm", "A hedge fund long/short strategy", "A mutual fund growth strategy"],
        answer: 1,
        explain: "Leveraged buyouts (LBOs) are the hallmark of private equity. PE firms use debt to acquire mature companies, improve operations, then exit. VC targets early-stage startups with equity (rarely debt). Hedge funds use public markets. Mutual funds don't take controlling stakes."
      },
      {
        q: "Venture capital investments are best characterized as:",
        options: ["Low-risk loans to established corporations", "Early-stage equity investments with high failure rates and high potential upside", "Short-selling strategies in public markets", "Leveraged buyouts of profitable companies"],
        answer: 1,
        explain: "VC is high-risk, high-reward equity investing in startups. Many investments fail entirely, but a few can return multiples of the original investment. This is fundamentally different from debt (A), public market strategies (C), or LBOs of mature companies (D)."
      }
    ]
  },
  {
    id: "limited-partnership",
    title: "Limited Partnerships",
    category: "Investment Companies",
    color: "#7C3AED",
    analogy: "The general partner is the contractor who builds and manages the building — and is personally on the hook if anything goes wrong. The limited partners are the passive investors who wrote the check and must stay out of the way. The moment a limited partner picks up a hammer, their liability protection disappears.",
    rule: "General Partner (GP): manages operations, unlimited personal liability. Limited Partners (LPs): passive investors only, liability capped at their investment. If LPs actively participate in management, they risk losing their limited liability status. LPs receive pass-through income/losses on Schedule K-1.",
    watch: "If a limited partner 'participates in management' → they may be treated as a general partner with unlimited personal liability. This is the classic exam trap. LPs do NOT vote on day-to-day decisions — only major structural matters.",
    quiz: [
      {
        q: "In a limited partnership, what happens if a limited partner begins actively participating in management decisions?",
        options: ["They receive a larger share of profits", "They may lose their limited liability protection", "They become co-general partners automatically", "Nothing — management participation has no legal effect"],
        answer: 1,
        explain: "Limited partners must remain passive to keep their liability limited to their investment. If they actively participate in management, courts may treat them as general partners with unlimited personal liability."
      },
      {
        q: "Which partner in a limited partnership bears unlimited personal liability for the debts of the business?",
        options: ["All limited partners equally", "The general partner", "The investor with the largest capital contribution", "No partner — limited partnerships cap all liability"],
        answer: 1,
        explain: "The general partner manages the LP and accepts unlimited personal liability. Limited partners' exposure is capped at their investment. This liability asymmetry is the core structural feature of a limited partnership."
      }
    ]
  },
  {
    id: "no-load-funds",
    title: "No-Load Funds & 12b-1 Fees",
    category: "Investment Companies",
    color: "#7C3AED",
    analogy: "'No-load' doesn't mean 'no fees.' It's like a restaurant advertising 'no cover charge' — you still pay for the food (expense ratio), and they might tuck in a small marketing surcharge (12b-1 fee up to 0.25%). Over that threshold, the label disappears.",
    rule: "No-load fund = no front-end or back-end sales load. May still charge a 12b-1 fee up to 0.25% and retain the 'no-load' label. If 12b-1 > 0.25%, it is NOT a no-load fund. 12b-1 fees are annual distribution/marketing costs included in the expense ratio, named after SEC Rule 12b-1.",
    watch: "A fund with a 12b-1 fee of 0.25% or LESS can still call itself no-load. Above 0.25% and it cannot. The threshold is exactly 0.25% — not 0.50% or 1%. The fee is part of the ongoing expense ratio, not a separate transaction charge.",
    quiz: [
      {
        q: "A mutual fund charges no front-end or back-end load, but charges a 0.20% annual 12b-1 fee. Under FINRA rules, the fund may still be called:",
        options: ["A load fund", "A no-load fund", "An illegal fund", "A closed-end fund"],
        answer: 1,
        explain: "FINRA allows a fund to call itself 'no-load' if total 12b-1 fees are 0.25% or less per year and there is no front-end or back-end load. At 0.20%, this fund qualifies."
      },
      {
        q: "A 12b-1 fee is best described as:",
        options: ["A penalty for early redemption", "An annual fee charged by a fund to cover distribution and marketing costs", "A transaction fee paid to the broker at purchase", "A tax on capital gains distributions"],
        answer: 1,
        explain: "12b-1 fees (named for the SEC rule) are annual charges deducted from fund assets to cover distribution (sales) and marketing costs. They appear as part of the expense ratio, not as a separate transaction charge."
      },
      {
        q: "At what maximum 12b-1 fee level can a fund still legally call itself a 'no-load' fund?",
        options: ["0.10%", "0.25%", "0.50%", "1.00%"],
        answer: 1,
        explain: "FINRA Rule 2341 sets 0.25% as the threshold. A fund with 12b-1 fees at or below 0.25% may be marketed as no-load. Above that level, the ongoing fee is considered a load equivalent and the fund loses the no-load label."
      }
    ]
  },
  {
    id: "reits",
    title: "Real Estate Investment Trusts (REITs)",
    category: "Investment Companies",
    color: "#7C3AED",
    analogy: "A REIT is like a mutual fund for real estate — it pools capital to own properties or mortgages, and is legally required to pass most of its income directly to shareholders. You can own a slice of an apartment complex or office tower without ever signing a lease.",
    rule: "REIT qualification: (1) at least 75% of assets in real estate/mortgages, (2) at least 75% of income from real estate, (3) must distribute at least 90% of taxable income to shareholders. Three types: Equity (owns/operates property), Mortgage (holds loans/MBS), Hybrid (both). Distributed income avoids corporate-level tax.",
    watch: "The 90% distribution requirement is a key exam number — not 75%, not 100%. REITs are NOT classified as investment companies under ICA 1940. Mortgage REITs earn interest on loans, NOT rent. Publicly traded REITs trade on exchanges; non-traded REITs do not.",
    quiz: [
      {
        q: "To maintain its REIT status and avoid corporate income tax on distributed earnings, a REIT must distribute at least what percentage of its taxable income?",
        options: ["50%", "75%", "90%", "100%"],
        answer: 2,
        explain: "REITs must distribute at least 90% of their taxable income to shareholders annually to qualify for pass-through tax treatment. This high distribution requirement is why REITs are popular income investments."
      },
      {
        q: "A REIT that owns and operates apartment buildings and shopping centers is best classified as a:",
        options: ["Mortgage REIT", "Equity REIT", "Hybrid REIT", "Unit investment trust"],
        answer: 1,
        explain: "Equity REITs own and operate physical properties and earn income from rent. Mortgage REITs hold mortgages or MBS and earn interest. Hybrid REITs do both. Owning apartment buildings = equity REIT."
      }
    ]
  },
  {
    id: "fund-pricing",
    title: "Mutual Fund Pricing & Forward Pricing",
    category: "Investment Companies",
    color: "#7C3AED",
    analogy: "Buying a mutual fund is like ordering at a restaurant that only posts prices after the kitchen closes. Your order goes in during the day, but the price isn't set until after 4 PM. You always get tomorrow's price — never the price at the moment you ordered.",
    rule: "NAV = (Total Assets − Liabilities) ÷ Shares Outstanding. Calculated once daily after market close. Forward pricing rule (SEC Rule 22c-1): orders received by 4 PM ET fill at that day's NAV; orders after cutoff fill at next day's NAV. POP (Class A) = NAV ÷ (1 − load%).",
    watch: "You NEVER buy at the current NAV — always the next computed NAV (forward pricing). This prevents timing on stale intraday prices. Also: POP = NAV ÷ (1 − load%), NOT NAV × (1 + load%). The load is a percentage of the offering price, not of NAV.",
    quiz: [
      {
        q: "An investor submits a purchase order for an open-end mutual fund at 2:00 PM ET. At what price will the order be filled?",
        options: ["The NAV at 2:00 PM", "The NAV calculated after the market closes that day", "The prior day's closing NAV", "The NAV at the next day's market open"],
        answer: 1,
        explain: "The forward pricing rule (SEC Rule 22c-1) requires that all orders received before the 4 PM ET cutoff be executed at that day's end-of-day NAV. You never buy at the current NAV — you always buy at the next NAV calculated after your order."
      },
      {
        q: "A mutual fund has total assets of $500 million, liabilities of $20 million, and 24 million shares outstanding. What is the NAV per share?",
        options: ["$19.17", "$20.00", "$20.83", "$22.73"],
        answer: 1,
        explain: "NAV = (Assets − Liabilities) ÷ Shares = ($500M − $20M) ÷ 24M = $480M ÷ 24M = $20.00 per share."
      },
      {
        q: "The public offering price (POP) of a Class A mutual fund share is $10.50 and the sales load is 5%. What is the NAV?",
        options: ["$9.98", "$10.00", "$10.50", "$11.03"],
        answer: 0,
        explain: "NAV = POP × (1 − load%) = $10.50 × 0.95 = $9.975 ≈ $9.98. Alternatively: load $ = 5% × $10.50 = $0.525; NAV = $10.50 − $0.525 = $9.975. The POP always exceeds NAV for Class A shares — NAV is what you get after backing out the sales charge."
      }
    ]
  },
  {
    id: "share-class-suitability",
    title: "Share Class Suitability",
    category: "Investment Companies",
    color: "#7C3AED",
    analogy: "Choosing a share class is like deciding between paying $500 to join a gym for two years vs. $30/month with no commitment. For a long-term member, the upfront fee wins. For someone who might cancel in 6 months, monthly wins. Recommending the wrong structure just to earn more commission is a suitability violation.",
    rule: "Class A: best for large investments (breakpoints) or long time horizons. Class B: rarely suitable today — high CDSC plus elevated ongoing 12b-1 fees. Class C: best for short-to-medium holds (1–3 years). Always factor total cost over expected holding period. Recommending B when A with a breakpoint is clearly better = suitability violation.",
    watch: "FINRA has brought enforcement cases for 'Class B abuse' — recommending B shares when A shares with breakpoints were clearly cheaper. LOIs can lower Class A's effective load even for mid-size purchases. Never recommend a higher-cost class to earn a larger commission.",
    quiz: [
      {
        q: "A client invests $250,000 in a mutual fund and plans to hold for 20 years. Which share class is most suitable?",
        options: ["Class A with breakpoint reduction", "Class B with CDSC", "Class C with annual 12b-1", "All classes are equally suitable"],
        answer: 0,
        explain: "For large investments, Class A breakpoints substantially reduce the front-end load. For long holding periods, a one-time front-end load is cheaper than 20 years of Class C's annual 12b-1 fees. Class B is generally unsuitable for large purchases."
      },
      {
        q: "A registered representative recommends Class B shares to a client investing $300,000, when Class A with a breakpoint would result in lower total costs. This is BEST described as:",
        options: ["A suitable recommendation if the client prefers no upfront load", "A potential suitability violation — the rep may have prioritized commission", "Acceptable because Class B eventually converts to Class A", "Required by FINRA rules for investments over $100,000"],
        answer: 1,
        explain: "Recommending a higher-cost share class when a lower-cost option is clearly more suitable (especially at breakpoint-eligible amounts) is a suitability violation. FINRA has brought cases against reps who churned clients into Class B when Class A was better."
      }
    ]
  },
  {
    id: "letter-of-intent",
    title: "Letter of Intent & Rights of Accumulation",
    category: "Investment Companies",
    color: "#7C3AED",
    analogy: "An LOI is like getting a bulk discount in advance. You commit to buying $100,000 over 13 months and the fund gives you the discounted load rate immediately — but holds some early shares in escrow as collateral. If you don't follow through, they quietly liquidate those escrowed shares to recapture the discount they gave you.",
    rule: "Letter of Intent (LOI): non-binding commitment to invest enough over 13 months to reach a breakpoint; investor gets the reduced load immediately; escrowed shares cover the shortfall if they fall short; LOI can be backdated up to 90 days. Rights of Accumulation (ROA): current holdings + new purchase combined to determine breakpoint. Both apply across the fund family, may include household accounts.",
    watch: "LOI is NOT binding on the investor — but the fund protects itself via escrow. If the investor falls short, escrowed shares are liquidated to collect the extra load. Also: LOI can be backdated up to 90 days to include recent purchases toward the commitment.",
    quiz: [
      {
        q: "An investor signs a letter of intent to invest $100,000 in a fund family over 13 months to qualify for a reduced load. After 10 months, they have only invested $60,000. What happens?",
        options: ["The fund must honor the lower load on all purchases made so far", "The fund retroactively charges the higher load; shares held in escrow are liquidated to cover the difference", "The investor must pay a penalty equal to 10% of the shortfall", "The letter of intent automatically renews for another 13 months"],
        answer: 1,
        explain: "Shares from early purchases are held in escrow. If the investor doesn't fulfill the LOI, the fund liquidates escrowed shares to collect the difference between the reduced load they paid and the full load that should have applied. The LOI is non-binding for the investor but creates an escrow mechanism."
      },
      {
        q: "Rights of accumulation allow an investor to combine which of the following when calculating breakpoint eligibility?",
        options: ["Only new purchases made today", "Current account value plus new purchase amount", "Only purchases made in the current calendar year", "NAV of the investor's retirement accounts only"],
        answer: 1,
        explain: "Rights of accumulation combine the investor's existing holdings (at current NAV) with the new purchase to determine which breakpoint applies. This rewards long-term investors who have built up positions over time."
      }
    ]
  },
  {
    id: "private-vs-growth",
    title: "Private Funds vs. Growth-Oriented Funds",
    category: "Investment Companies",
    color: "#7C3AED",
    analogy: "Registered mutual funds are a public cafeteria — open to everyone, menu posted, prices regulated, regularly inspected by the SEC. Private funds are a private dining club — invitation only, exotic dishes, high fees, no posted menu, and almost no regulatory oversight of the food itself.",
    rule: "Private funds (3(c)(1) or 3(c)(7) exempt): no ICA 1940 registration, no prospectus, limited to accredited investors or qualified purchasers, higher fees ('2 and 20'), restricted redemptions. Registered funds (mutual funds, ETFs): ICA 1940 registered, daily NAV, prospectus required, regulated fees, open to all investors.",
    watch: "3(c)(1) = up to 100 beneficial owners, accredited investors. 3(c)(7) = any number of investors but all must be qualified purchasers ($5M+ in investments for individuals, $25M+ for institutions). Qualified purchaser is a higher bar than accredited investor.",
    quiz: [
      {
        q: "A hedge fund relying on Section 3(c)(1) of the Investment Company Act of 1940 may have no more than how many beneficial owners?",
        options: ["25", "100", "500", "2,000"],
        answer: 1,
        explain: "Section 3(c)(1) exempts a fund from ICA 1940 registration if it has no more than 100 beneficial owners and does not make a public offering. This is the classic hedge fund exemption for smaller funds."
      },
      {
        q: "Which of the following investors is eligible to invest in a 3(c)(7) exempt fund?",
        options: ["Any U.S. citizen over age 18", "Accredited investors only", "Qualified purchasers (individuals with $5M+ in investments)", "Institutional investors only"],
        answer: 2,
        explain: "Section 3(c)(7) requires all investors to be 'qualified purchasers' — individuals with at least $5 million in investments or institutions with at least $25 million. This is a higher bar than accredited investor status (which requires $1M net worth or $200K income)."
      }
    ]
  },
  {
    id: "etf-vs-closed-end",
    title: "ETFs vs. Closed-End Funds",
    category: "Investment Companies",
    color: "#7C3AED",
    analogy: "Both ETFs and closed-end funds trade on an exchange like stocks — but only ETFs have a price-correction mechanism. A closed-end fund trading at a 15% discount is like a dollar bill selling for 85 cents with no one able to force it back to par. The ETF version would be arbitraged back to $1.00 almost immediately.",
    rule: "Both ETFs and closed-end funds trade intraday on exchanges. Key difference: ETFs use authorized participant creation/redemption to keep price near NAV. Closed-end funds have no such mechanism — discounts/premiums can persist for years. Closed-end funds more often actively managed and may use leverage. ETFs: lower costs, usually passive.",
    watch: "Closed-end discounts are persistent — buying at a 15% discount means ~$1.18 of assets per $1.00 paid, but those discounts may never close. 'Trades on an exchange' alone does NOT make a fund an ETF. The authorized participant mechanism is the defining structural difference.",
    quiz: [
      {
        q: "Which feature of ETFs prevents them from trading at persistent large discounts or premiums to NAV, unlike closed-end funds?",
        options: ["SEC-mandated price floors", "Exchange circuit breakers", "Authorized participant creation/redemption arbitrage", "Daily NAV disclosure requirements"],
        answer: 2,
        explain: "When an ETF's price deviates from NAV, authorized participants exploit the arbitrage by creating or redeeming creation units, pushing the price back to NAV. Closed-end funds have no such mechanism, so discounts/premiums can persist for years."
      },
      {
        q: "A closed-end fund that launched with $500 million in assets now trades at a 15% discount to NAV. An investor buying shares today receives:",
        options: ["$1.00 of assets for every $1.00 paid", "$1.18 of assets for every $1.00 paid", "$0.85 of assets for every $1.00 paid", "$1.15 of assets for every $1.00 paid"],
        answer: 1,
        explain: "At a 15% discount, you pay $0.85 for every $1.00 of NAV. Flipping that: $1.00 ÷ $0.85 ≈ $1.18 of assets per dollar spent. Buying at a discount is a feature of closed-end funds — you get more underlying value per dollar than you would from an ETF or mutual fund."
      }
    ]
  },
  {
    id: "uits",
    title: "Unit Investment Trusts (UITs)",
    category: "Investment Companies",
    color: "#7C3AED",
    analogy: "A UIT is a sealed terrarium — someone assembles it carefully, seals the lid, and it just runs on its own until termination. No one reaches in to swap plants. A mutual fund is more like a garden with an active gardener who pulls weeds and replants based on market conditions.",
    rule: "UITs issue redeemable units against a fixed, unmanaged portfolio. No board of directors, no active trading — portfolio held to termination. Two types: bond UITs (held to maturity, proceeds passed through) and equity UITs (held for a fixed term). One-time creation/sales charge; no ongoing management fees.",
    watch: "UITs have NO board of directors — this is their defining feature. The portfolio is fixed at creation and never traded. UITs are NOT the same as closed-end funds (which trade actively on exchanges). Units are redeemable with the trust, not traded on an exchange.",
    quiz: [
      {
        q: "Which of the following BEST distinguishes a unit investment trust from an open-end mutual fund?",
        options: ["UITs trade on stock exchanges; mutual funds do not", "UITs have a fixed, unmanaged portfolio and no board of directors; mutual funds have active management", "UITs are only available to institutional investors", "UITs guarantee return of principal at maturity"],
        answer: 1,
        explain: "The defining feature of a UIT is its fixed, passively held portfolio with no active management and no board of directors. Mutual funds have ongoing active (or at least responsive) management and a board. UITs do not trade on exchanges — their units are redeemable with the trust, similar to open-end funds."
      },
      {
        q: "An investor purchases units in a bond UIT. What happens to those bonds over time?",
        options: ["The portfolio manager replaces maturing bonds with new ones", "The bonds are held to maturity and proceeds are distributed to unit holders", "The trust automatically reinvests all proceeds into higher-yielding bonds", "The portfolio is rebalanced quarterly based on interest rate movements"],
        answer: 1,
        explain: "Bond UITs hold their fixed portfolio to maturity. As bonds mature, the proceeds are passed through to unit holders — there is no reinvestment or portfolio turnover. This is fundamentally different from a bond mutual fund, which actively manages its portfolio."
      }
    ]
  },
  {
    id: "nav-calculation",
    category: "Investment Companies",
    title: "What's Included in NAV Calculation",
    color: "#60A5FA",
    analogy: "NAV is a snapshot of what the fund is actually worth — assets minus liabilities, divided by shares outstanding. Sales charges are what you pay to get in the door; they're not part of what's inside the fund.",
    rule: "NAV = (Total Assets − Total Liabilities) ÷ Shares Outstanding. Included: portfolio asset values, accrued management fees, accrued custodian fees, all other fund liabilities. NOT included: sales charges (loads). Sales charges are transaction costs paid to buy shares — they're external to the fund's value.",
    watch: "The exam will list accrued fees (management, custodian) as possible exclusions — they ARE included as liabilities. Only sales charges are excluded from NAV.",
    quiz: [
      {
        q: "Which of the following is NOT included in the calculation of a mutual fund's NAV per share?",
        options: ["Accrued sales charges", "Accrued custodian bank fees", "Closing values of portfolio assets", "Accrued management fees"],
        answer: 0,
        explain: "NAV reflects the fund's internal value — assets minus liabilities divided by shares. Sales charges are paid to purchase shares and are external to the fund. Custodian fees and management fees are liabilities of the fund and ARE included. Portfolio asset values are the primary asset component."
      }
    ]
  },
  {
    id: "ica-advisory-contract",
    category: "Regulations",
    title: "ICA 1940: Investment Advisory Contract Requirements",
    color: "#F472B6",
    analogy: "Think of the advisory contract as a formal employment agreement that investors — not just management — have a stake in. The ICA built in investor protections: shareholders get a vote, contracts must be written, and either party can walk with 60 days notice.",
    rule: "Under ICA 1940, advisory contracts must: (1) be in writing, (2) state the adviser's compensation, (3) be terminable with no more than 60 days written notice by either party without penalty, (4) be renewed annually by majority vote of the board OR majority vote of outstanding shares, AND majority vote of noninterested board members. No oral contracts permitted.",
    watch: "Two common traps: (1) renewal requires ONLY board vote — false, it can also be shareholder vote. (2) no company may acquire LESS than 3% of another — false, the cap is no MORE than 3%. Also: ICA requires written contracts; oral contracts are never valid here.",
    quiz: [
      {
        q: "Which of the following correctly states a requirement under the Investment Company Act of 1940?",
        options: [
          "No registered investment company may acquire less than 3% of the shares of another investment company",
          "Renewal of the advisory contract can only be done with majority vote of the fund's board of directors",
          "No investment advisory contract may be entered into that does not provide for termination with no more than 60 days notice in writing",
          "A registered open-end investment company using a bank as custodian must choose one that has FDIC coverage"
        ],
        answer: 2,
        explain: "C is correct — advisory contracts must allow termination with no more than 60 days written notice. A is wrong because the rule caps ownership at no MORE than 3%, not no less. B is wrong because renewal requires board vote OR shareholder vote (not board only), plus noninterested board members. D is not an ICA requirement."
      },
      {
        q: "Under the ICA 1940, an investment advisory contract renewal requires approval by:",
        options: [
          "Majority vote of the board of directors only",
          "Majority vote of outstanding shares only",
          "Either majority vote of the board or majority vote of outstanding shares, plus majority vote of noninterested board members",
          "Unanimous vote of all board members"
        ],
        answer: 2,
        explain: "Renewal requires (1) majority vote of the board OR majority vote of outstanding shares, AND (2) majority vote of the noninterested (independent) members of the board. Both conditions must be met."
      }
    ]
  },
  {
    id: "fund-types",
    category: "Investment Companies",
    title: "Mutual Fund Types by Objective",
    color: "#34D399",
    analogy: "Think of fund types as job descriptions. Growth funds want appreciation and stay hands-off on income. Income funds want yield. Balanced funds want both. Specialized/sector funds want exposure to one industry. Money market funds want safety and liquidity. Each type tells you both what they buy and why.",
    rule: "Key fund types: Growth (capital appreciation, no income focus), Income (dividends/interest), Balanced (mix of stocks and bonds), Specialized/Sector (concentrated in one industry — electronics, healthcare, etc.), Money Market (short-term instruments, stability), Index (tracks a benchmark passively).",
    watch: "If the question mentions a specific industry or sector AND the investor wants diversification within that sector — the answer is always specialized/sector fund, not hedge fund or growth fund.",
    quiz: [
      {
        q: "If an investor wants to invest in the electronics industry but does not want to limit investments to only one or two companies, which type of fund is most suitable?",
        options: ["Bond", "Money market", "Hedge", "Specialized"],
        answer: 3,
        explain: "A specialized (sector) fund concentrates on one industry but holds many companies within it — exactly what this investor wants. A hedge fund uses complex strategies unrelated to sector focus. Bond and money market funds don't provide equity exposure to a specific sector."
      }
    ]
  },
  {
    id: "breakpoints",
    category: "Investment Companies",
    title: "Breakpoints, Rights of Accumulation & Sales Charge Discounts",
    color: "#FBBF24",
    analogy: "Breakpoints are volume discounts — the more you invest, the lower your sales load percentage. Think of it like a wholesale price: once you hit a threshold, you get a better rate. The SEC permits these discounts for specific eligible purchasers.",
    rule: "Sales charge discounts (breakpoints) are available to: individual purchasers making large purchases, employee benefit plans, employees of the investment company and its affiliates, and investment clubs as an entity. NOT available to: individuals acting as agent FOR an investment club (the club gets the discount, not the individual agent).",
    watch: "The trap: 'an individual acting as agent for an investment club' — the individual does not qualify, the club itself does. The fund sees the individual's purchase, not the club's pooled amount.",
    quiz: [
      {
        q: "SEC rules permit mutual funds to make sales charge discounts available to all of the following EXCEPT",
        options: [
          "An individual acting as agent for an investment club",
          "Employee benefit plans",
          "Individual purchasers making large purchases",
          "Employees of the investment company and its affiliates"
        ],
        answer: 0,
        explain: "An individual acting as agent for an investment club does not qualify for breakpoint discounts — the club itself would qualify, but not an individual agent acting on its behalf. Employee benefit plans, large individual purchasers, and fund employees all qualify for sales charge discounts."
      }
    ]
  },
  {
    id: "fund-of-funds",
    category: "Investment Companies",
    title: "Fund of Hedge Funds",
    color: "#A78BFA",
    analogy: "A fund of funds is a fund that buys other funds. You're paying fees at two levels — the underlying hedge funds all charge their own fees, and then the fund of funds charges another layer on top. It's like paying a travel agent to book hotels that already have resort fees.",
    rule: "Fund of hedge funds: pools investor capital to invest across multiple hedge funds. Key characteristic: double layer of fees (underlying fund fees + fund of funds fees) = higher total expenses than most other fund types. Redemption is typically restricted (lock-up periods). No guarantee of profit in any market direction.",
    watch: "D ('profit whether markets go up or down') is the classic wrong answer — that's a marketing pitch for hedge strategies, but no fund can guarantee it. The correct distinguishing feature is higher expenses due to the double fee layer.",
    quiz: [
      {
        q: "Several clients wish to invest in a fund of hedge funds. You could tell them that",
        options: [
          "Shares of these funds are easy to redeem",
          "Expenses for these funds tend to be higher than those for other funds",
          "These funds purchase a large amount of preferred stock",
          "They can expect to make a profit whether markets trend up or down"
        ],
        answer: 1,
        explain: "Fund of hedge funds layer fees on top of fees — investors pay the underlying hedge fund expenses plus an additional layer at the fund of funds level, resulting in higher total costs. Redemption is typically restricted, not easy. D is the classic trap — no fund guarantees profit in both up and down markets."
      }
    ]
  },
  {
    id: "alternative-investments",
    category: "Alternative Investments",
    title: "Alternative Investments: Key Characteristics",
    color: "#A78BFA",
    analogy: "Alternative investments are everything outside the standard stock/bond menu. Think real estate, hedge funds, private equity, commodities. They're like specialty restaurants — harder to get into, harder to leave, but they serve things you can't get at a regular diner.",
    rule: "Alternative investments vs exchange-traded stocks: LESS liquid (hard to buy/sell quickly), MORE diversification opportunity (they move differently from stocks, so they reduce correlation in a portfolio). Types include: DPPs, REITs, hedge funds, private equity, commodities, ETNs. Not suitable for investors who need quick access to funds.",
    watch: "The exam pairs liquidity and diversification: alternatives = LESS liquid + MORE diversification. Don't flip them. Diversification benefit comes from low correlation with traditional assets — they zig when stocks zag.",
    quiz: [
      {
        q: "Comparing alternative investments to exchange-traded stocks, the markets for alternative investments are generally",
        options: [
          "Less liquid and provide more opportunity for diversification",
          "More liquid and provide less opportunity for diversification",
          "Less liquid and provide less opportunity for diversification",
          "More liquid and provide more opportunity for diversification"
        ],
        answer: 0,
        explain: "Alternative investments (hedge funds, private equity, real estate, DPPs) are harder to buy and sell than exchange-traded stocks — lower liquidity. But because they tend to move differently from stocks and bonds, they add diversification to a portfolio. Less liquid + more diversification opportunity is the standard pairing."
      }
    ]
  },
  {
    id: "dpps",
    category: "Alternative Investments",
    title: "DPPs: Direct Participation Programs",
    color: "#F472B6",
    analogy: "A DPP is like buying into a small business with a silent partner arrangement. The general partner runs the show, makes all decisions, and has unlimited personal liability. The limited partners put in money, receive their share of income and losses, and can only lose what they invested. It's passive ownership — you participate in the results without managing anything.",
    rule: "DPP (Direct Participation Program) = limited partnership structure. General Partner (GP): manages the business, makes decisions, buys/sells property, has UNLIMITED liability. Limited Partners (LPs): passive investors, limited liability (max loss = amount invested), receive pass-through of income AND losses. Passive loss rule: passive losses can ONLY offset passive income — NOT ordinary income or capital gains. Unused passive losses carry forward. The $3,000/year deduction limit is for capital losses, NOT passive losses.",
    watch: "Passive loss trap: the $3,000 limit applies to capital losses against ordinary income — not passive losses. Passive losses are ring-fenced: they only offset passive income. GP has UNLIMITED liability (not limited). LP's max loss = their investment only.",
    quiz: [
      {
        q: "Your client who owns a DPP that generated a $10,000 passive loss for the year could",
        options: [
          "Only deduct the passive loss against passive income",
          "Deduct $10,000 against capital gains",
          "Deduct $3,000 against ordinary income and carry over the rest",
          "Deduct $10,000 against ordinary income"
        ],
        answer: 0,
        explain: "Passive losses can ONLY be deducted against passive income. They cannot offset ordinary income (wages, salary) or capital gains. The $3,000 limit in C is the rule for capital losses against ordinary income — a different rule entirely. Any unused passive loss carries forward to future years."
      },
      {
        q: "In a DPP, a general partner is all of the following EXCEPT",
        options: [
          "One who buys and sells the program's property",
          "One who has limited liability",
          "A key executive who makes day-to-day business decisions",
          "One who appoints the property manager"
        ],
        answer: 1,
        explain: "General partners have UNLIMITED liability — they run the business and are personally responsible for its obligations. Limited liability is a feature of LIMITED partners, not general partners. GPs do buy/sell property, make decisions, and appoint managers."
      },
      {
        q: "A client invests $100,000 in a commercial real estate DPP as a limited partner with a 10% interest. The partnership forecloses with a net loss of $2 million. What is the effect on the client?",
        options: [
          "The client must pay their share of the loss to creditors",
          "A potential claim against the agent who sold the program",
          "The client has a passive loss of $100,000",
          "The client has a passive loss of $200,000"
        ],
        answer: 2,
        explain: "Limited partners can only lose their original investment — $100,000. Even though 10% of $2 million = $200,000, the limited liability cap means the client's maximum loss is what they put in. The $100,000 loss is a passive loss (deductible only against passive income). The client is NOT personally liable to creditors beyond their investment."
      }
    ]
  },
  {
    id: "etns",
    category: "Alternative Investments",
    title: "ETNs: Exchange-Traded Notes",
    color: "#38BDF8",
    analogy: "An ETN is a promise from a bank: 'We'll pay you a return linked to this index when the note matures.' It's an IOU, not ownership of anything. If the bank fails, you're an unsecured creditor — no collateral, no FDIC backstop. You're trusting the bank's creditworthiness.",
    rule: "ETN = Exchange-Traded Note = unsecured DEBT security (not equity). Issued by financial institutions (banks). Tracks an index or benchmark. Traded on exchanges like stocks. NOT FDIC insured (FDIC covers bank deposits only, not investment products). Key risk: issuer/credit risk — if the bank fails, you may not get paid. No ownership of underlying assets.",
    watch: "ETN vs ETF: ETF holds actual assets (stocks, bonds). ETN is a bank's promise to pay — no underlying assets held. FDIC insures deposits (checking, savings), NOT investment products. 'Note' = debt = unsecured debt security, not equity.",
    quiz: [
      {
        q: "Exchange-traded notes (ETNs) are which of these? I. Unsecured debt securities II. Unsecured equity securities III. Issued by financial institutions, such as banks IV. Insured by the FDIC",
        options: ["II and III", "I and IV", "I and III", "II and III"],
        answer: 2,
        explain: "ETNs are unsecured DEBT securities (I ✓) — 'note' = debt, not equity. They are issued by financial institutions like banks (III ✓). They are NOT equity (II ✗). They are NOT FDIC insured (IV ✗) — FDIC covers bank deposits, not investment products. The key risk of ETNs is credit/issuer risk."
      }
    ]
  },
  {
    id: "leveraged-etfs",
    category: "Alternative Investments",
    title: "Leveraged ETFs: How They Work & Suitability",
    color: "#FB923C",
    analogy: "A 3x leveraged ETF is like a car with a turbo boost that resets every morning. Each day it gives you 3x the index move. But the boost resets daily — it doesn't compound cleanly over time. In choppy markets, the daily resets cause 'volatility decay' — you can lose money even if the index ends up flat. It's a racing car, not a family vehicle.",
    rule: "Leveraged ETF amplifies daily index returns by a fixed multiplier (2x, 3x, or inverse). Leverage obtained through DERIVATIVES (swaps), NOT bank borrowing. Can be purchased on margin. NOT suitable for long-term investors or retirement accounts — designed for short-term trading only. No accredited investor requirement (anyone can buy). Math: apply multiplier to each day's index move independently, using the prior day's closing price as the new base.",
    watch: "Leverage comes from derivatives (swaps), not bank borrowing — common trap. Suitable for short-term traders only — NOT long-term investors. Buying on margin IS permitted. No accredited investor restriction. In the math, apply the multiplier each day separately — don't net the index moves first.",
    quiz: [
      {
        q: "Among the characteristics of leveraged ETFs is that",
        options: [
          "They are generally suitable for investors with a long time horizon",
          "They can only be sold to accredited investors",
          "Leveraged ETFs may be purchased on margin",
          "Leveraged ETFs generally obtain leverage through bank borrowing"
        ],
        answer: 2,
        explain: "Leveraged ETFs trade on exchanges like regular stocks and can be purchased on margin (C ✓). They are NOT suitable for long-term investors — daily resets cause volatility decay over time (A ✗). No accredited investor requirement (B ✗). Leverage is obtained through derivatives like swaps, not bank borrowing (D ✗)."
      },
      {
        q: "A 3x leveraged fund priced at $42 tracks an index that is up 2% one day and then down 3% the next day. What should this fund be priced at approximately following these two days?",
        options: ["$45.86", "$40.50", "$41.55", "$43.18"],
        answer: 2,
        explain: "Day 1: index up 2% → fund up 6% → $42 × 1.06 = $44.52. Day 2: index down 3% → fund down 9% → $44.52 × 0.91 = $40.51. Closest answer is C, $41.55. Note: even though the index only net moved -1%, the fund lost more due to volatility decay from daily resets — this illustrates why leveraged ETFs are not suitable for long-term holding."
      }
    ]
  },
  {
    id: "precious-metals",
    category: "Alternative Investments",
    title: "Precious Metals vs Base/Industrial Metals",
    color: "#FCD34D",
    analogy: "Precious metals are the jewelry counter — gold, silver, platinum. Rare, valued for their own sake, used as stores of value and inflation hedges. Base metals are the hardware store — copper, aluminum, nickel. Industrial materials used in manufacturing.",
    rule: "Precious metals: gold, silver, platinum. Used as inflation hedges and stores of value. Base/industrial metals: copper, aluminum, nickel, zinc. Used primarily in manufacturing and industry. An IAR recommending 'precious metals exposure' would suggest gold, silver, or platinum — NOT copper, aluminum, or nickel.",
    watch: "Platinum IS a precious metal (often forgotten). Copper, aluminum, and nickel are industrial/base metals — not precious. This distinction appears in suitability questions about inflation hedging or alternative investments.",
    quiz: [
      {
        q: "An IAR has several clients interested in adding precious metals to their portfolios. Which would the IAR most likely recommend?",
        options: ["Platinum", "Aluminum", "Copper", "Nickel"],
        answer: 0,
        explain: "Platinum is a precious metal, along with gold and silver. Aluminum, copper, and nickel are base/industrial metals — they have industrial uses but are not classified as precious metals and would not be recommended for precious metals exposure."
      }
    ]
  }
];

const allQuestions = CONCEPTS.flatMap(c =>
  c.quiz.map(q => ({ ...q, category: c.category, conceptTitle: c.title, color: c.color }))
);

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

const fmtDate = () => new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });

const scoreColor = (pct) => {
  if (pct == null) return "#444";
  if (pct >= 80) return "#34D399";
  if (pct >= 60) return "#E8C547";
  return "#FF6B6B";
};

const getAvg = (runs) => {
  if (!runs || runs.length === 0) return null;
  return Math.round(runs.reduce((s, r) => s + r.pct, 0) / runs.length);
};

export default function StudyGuide() {
  const [mode, setMode] = useState("home");
  const [activeCard, setActiveCard] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // quiz
  const [quizSection, setQuizSection] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  // progress — persisted in localStorage
  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("s65_progress")) || { sectionHistory: {}, fullQuizHistory: [] };
    } catch { return { sectionHistory: {}, fullQuizHistory: [] }; }
  });

  const concept = CONCEPTS[activeCard];
  const currentQ = quizQuestions[quizIndex];
  const pct = quizQuestions.length > 0 ? Math.round((score / quizQuestions.length) * 100) : 0;

  const startQuiz = (sectionId = null) => {
    const c = sectionId ? CONCEPTS.find(x => x.id === sectionId) : null;
    const pool = sectionId
      ? c.quiz.map(q => ({ ...q, category: c.category, conceptTitle: c.title, color: c.color }))
      : allQuestions;
    setQuizSection(sectionId);
    setQuizQuestions(shuffle(pool));
    setQuizIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setWrongAnswers([]);
    setQuizStarted(true);
  };

  const saveResult = (sectionId, finalScore, total) => {
    const p = Math.round((finalScore / total) * 100);
    const entry = { date: fmtDate(), score: finalScore, total, pct: p };
    setProgress(prev => {
      const next = { sectionHistory: { ...prev.sectionHistory }, fullQuizHistory: [...prev.fullQuizHistory] };
      if (sectionId) {
        next.sectionHistory[sectionId] = [entry, ...(next.sectionHistory[sectionId] || [])].slice(0, 30);
      } else {
        next.fullQuizHistory = [entry, ...next.fullQuizHistory].slice(0, 30);
      }
      localStorage.setItem("s65_progress", JSON.stringify(next));
      return next;
    });
  };

  const handleAnswer = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === currentQ.answer) setScore(s => s + 1);
    else setWrongAnswers(w => [...w, { ...currentQ, chosen: i }]);
  };

  const nextQuestion = () => {
    if (quizIndex + 1 >= quizQuestions.length) {
      saveResult(quizSection, score, quizQuestions.length);
      setFinished(true);
    } else {
      setQuizIndex(q => q + 1);
      setSelected(null);
    }
  };

  const resetQuiz = () => startQuiz(quizSection);
  const exitQuiz = () => { setQuizStarted(false); setFinished(false); };

  const navTo = (m) => {
    setMode(m);
    setFlipped(false);
    if (m !== "quiz") exitQuiz();
  };

  const NAV = [["home", "Overview"], ["flashcards", "Flashcards"], ["quiz", "Quiz"], ["progress", "Progress"]];

  return (
    <div style={{ minHeight: "100vh", background: "#09090f", color: "#ede9e0", fontFamily: "'Georgia', 'Times New Roman', serif", WebkitTapHighlightColor: "transparent" }}>

      {/* NAV */}
      <div style={{ borderBottom: "1px solid #1a1a26", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0c0c14", position: "sticky", top: 45, zIndex: 10 }}>
        <div style={{ display: "none" }}>
          <span style={{ fontSize: 10, letterSpacing: 3, color: "#444", textTransform: "uppercase" }}>Series 65</span>
        </div>
        <div style={{ display: "flex", gap: 4, width: "100%" }}>
          {NAV.map(([m, label]) => (
            <button key={m} onClick={() => navTo(m)}
              style={{ flex: 1, padding: "9px 4px", background: mode === m ? "#ede9e0" : "transparent", color: mode === m ? "#09090f" : "#555", border: `1px solid ${mode === m ? "#ede9e0" : "#2a2a3a"}`, borderRadius: 3, cursor: "pointer", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", fontFamily: "inherit", transition: "all 0.15s", touchAction: "manipulation", minHeight: 40 }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* HOME */}
      {mode === "home" && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "36px 16px", paddingBottom: "max(36px, env(safe-area-inset-bottom))" }}>
          <div style={{ marginBottom: 36 }}>
            <p style={{ fontSize: 11, letterSpacing: 4, color: "#444", textTransform: "uppercase", margin: "0 0 10px" }}>Series 65</p>
            <h1 style={{ fontSize: 28, fontWeight: "normal", margin: "0 0 8px", lineHeight: 1.3 }}>{CONCEPTS.length} concepts · {allQuestions.length} questions</h1>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 36 }}>
            {CONCEPTS.map((c, i) => {
              const runs = progress.sectionHistory[c.id];
              const a = getAvg(runs);
              return (
                <div key={c.id} onClick={() => { setActiveCard(i); setMode("flashcards"); setFlipped(false); }}
                  style={{ padding: "18px", background: "#0f0f18", border: "1px solid #1a1a26", borderLeft: `3px solid ${c.color}`, borderRadius: 6, cursor: "pointer", touchAction: "manipulation" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#141420"}
                  onMouseLeave={e => e.currentTarget.style.background = "#0f0f18"}>
                  <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 6 }}>{c.category}</div>
                  <div style={{ fontSize: 14, fontWeight: "bold", color: c.color, marginBottom: 8 }}>{c.title}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "#333" }}>{c.quiz.length}q</span>
                    {a !== null
                      ? <span style={{ fontSize: 13, fontWeight: "bold", color: scoreColor(a) }}>{a}%</span>
                      : <span style={{ fontSize: 11, color: "#2a2a2a" }}>not yet</span>}
                  </div>
                  {a !== null && (
                    <div style={{ height: 3, background: "#1a1a26", borderRadius: 2, marginTop: 8 }}>
                      <div style={{ height: 3, background: scoreColor(a), borderRadius: 2, width: `${a}%` }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ padding: "20px", background: "#0f0f18", border: "1px solid #1a1a26", borderRadius: 6 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 10 }}>Memory stack</div>
            <div style={{ fontSize: 13, color: "#666", lineHeight: 1.9 }}>
              Strongest encoding: <span style={{ color: "#ede9e0" }}>spatial + visual</span> (warehouse, vending machine, rental unit).<br />
              Secondary: <span style={{ color: "#ede9e0" }}>narrative</span> — Grant → Exercise → Sale for ISO questions.<br />
              Numbers to own cold: <span style={{ color: "#ede9e0" }}>10% affiliate · 1yr/2yr ISO · $83.33 conversion math</span>
            </div>
          </div>
        </div>
      )}

      {/* FLASHCARDS */}
      {mode === "flashcards" && (
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "36px 16px", paddingBottom: "max(36px, env(safe-area-inset-bottom))" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <span style={{ fontSize: 11, color: "#444" }}>{activeCard + 1} of {CONCEPTS.length}</span>
            <div style={{ display: "flex", gap: 6 }}>
              {CONCEPTS.map((c, i) => (
                <div key={i} onClick={() => { setActiveCard(i); setFlipped(false); }}
                  style={{ width: 8, height: 8, borderRadius: "50%", background: i === activeCard ? c.color : "#222", cursor: "pointer", touchAction: "manipulation" }} />
              ))}
            </div>
          </div>

          <div onClick={() => setFlipped(f => !f)}
            style={{ background: "#0f0f18", border: `1px solid ${flipped ? concept.color + "55" : "#1a1a26"}`, borderLeft: `4px solid ${concept.color}`, borderRadius: 10, padding: "32px", minHeight: 280, cursor: "pointer", transition: "border-color 0.3s", userSelect: "none", touchAction: "manipulation" }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 6 }}>{concept.category}</div>
            <div style={{ fontSize: 20, fontWeight: "bold", color: concept.color, marginBottom: 24 }}>{concept.title}</div>

            {!flipped ? (
              <div>
                <div style={{ fontSize: 14, color: "#666", fontStyle: "italic", lineHeight: 1.8, marginBottom: 20 }}>"{concept.analogy}"</div>
                <div style={{ fontSize: 10, color: "#333", letterSpacing: 2, textTransform: "uppercase" }}>tap to see the rule →</div>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: "#555", textTransform: "uppercase", marginBottom: 8 }}>The Rule</div>
                  <div style={{ fontSize: 15, color: "#ede9e0", lineHeight: 1.7, fontWeight: "bold" }}>{concept.rule}</div>
                </div>
                <div style={{ padding: "14px 16px", background: "#14130a", border: "1px solid #2a2800", borderRadius: 6 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: "#E8C547", textTransform: "uppercase", marginBottom: 8 }}>⚠ Watch out</div>
                  <div style={{ fontSize: 13, color: "#888", lineHeight: 1.7 }}>{concept.watch}</div>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 18, justifyContent: "space-between" }}>
            <button onClick={() => { setActiveCard(n => Math.max(0, n - 1)); setFlipped(false); }} disabled={activeCard === 0}
              style={{ padding: "12px 18px", background: "transparent", color: activeCard === 0 ? "#2a2a2a" : "#666", border: `1px solid ${activeCard === 0 ? "#1a1a1a" : "#2a2a3a"}`, borderRadius: 4, cursor: activeCard === 0 ? "default" : "pointer", fontFamily: "inherit", fontSize: 12, touchAction: "manipulation", minHeight: 48 }}>
              ← prev
            </button>
            <button onClick={() => { setMode("quiz"); startQuiz(concept.id); }}
              style={{ padding: "12px 18px", background: concept.color, color: "#09090f", border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: "bold", touchAction: "manipulation", minHeight: 48 }}>
              quiz me
            </button>
            <button onClick={() => { setActiveCard(n => Math.min(CONCEPTS.length - 1, n + 1)); setFlipped(false); }} disabled={activeCard === CONCEPTS.length - 1}
              style={{ padding: "12px 18px", background: "transparent", color: activeCard === CONCEPTS.length - 1 ? "#2a2a2a" : "#666", border: `1px solid ${activeCard === CONCEPTS.length - 1 ? "#1a1a1a" : "#2a2a3a"}`, borderRadius: 4, cursor: activeCard === CONCEPTS.length - 1 ? "default" : "pointer", fontFamily: "inherit", fontSize: 12, touchAction: "manipulation", minHeight: 48 }}>
              next →
            </button>
          </div>
        </div>
      )}

      {/* QUIZ LAUNCHER */}
      {mode === "quiz" && !quizStarted && (
        <div style={{ maxWidth: 660, margin: "0 auto", padding: "36px 16px", paddingBottom: "max(36px, env(safe-area-inset-bottom))" }}>

          {/* Full quiz */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 12 }}>Full Quiz</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px", background: "#0f0f18", border: "1px solid #1a1a26", borderRadius: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>All Sections</div>
                <div style={{ fontSize: 12, color: "#555" }}>{allQuestions.length} questions · shuffled</div>
                {progress.fullQuizHistory.length > 0 && (
                  <div style={{ fontSize: 12, marginTop: 5, display: "flex", gap: 12 }}>
                    <span style={{ color: scoreColor(progress.fullQuizHistory[0].pct) }}>last: {progress.fullQuizHistory[0].pct}%</span>
                    <span style={{ color: scoreColor(getAvg(progress.fullQuizHistory)) }}>avg: {getAvg(progress.fullQuizHistory)}%</span>
                  </div>
                )}
              </div>
              <button onClick={() => startQuiz(null)}
                style={{ padding: "13px 22px", background: "#ede9e0", color: "#09090f", border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: "bold", touchAction: "manipulation", minHeight: 48, flexShrink: 0 }}>
                Start →
              </button>
            </div>
          </div>

          {/* Section quizzes */}
          <div>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 12 }}>By Section</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {CONCEPTS.map(c => {
                const runs = progress.sectionHistory[c.id];
                const a = getAvg(runs);
                return (
                  <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", background: "#0f0f18", border: "1px solid #1a1a26", borderLeft: `3px solid ${c.color}`, borderRadius: 6 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: "bold", color: c.color, marginBottom: 3 }}>{c.title}</div>
                      <div style={{ fontSize: 11, color: "#444", display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <span>{c.quiz.length}q</span>
                        {a !== null && <span style={{ color: scoreColor(a) }}>avg {a}%</span>}
                        {runs && <span style={{ color: "#2a2a2a" }}>{runs.length} run{runs.length !== 1 ? "s" : ""}</span>}
                      </div>
                    </div>
                    <button onClick={() => startQuiz(c.id)}
                      style={{ padding: "10px 14px", background: "transparent", color: c.color, border: `1px solid ${c.color}44`, borderRadius: 5, cursor: "pointer", fontFamily: "inherit", fontSize: 12, touchAction: "manipulation", minHeight: 44, flexShrink: 0 }}>
                      Quiz →
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* QUIZ ACTIVE */}
      {mode === "quiz" && quizStarted && !finished && (
        <div style={{ maxWidth: 660, margin: "0 auto", padding: "36px 16px", paddingBottom: "max(36px, env(safe-area-inset-bottom))" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 11, color: "#444" }}>{quizIndex + 1} / {quizQuestions.length}</span>
            <span style={{ fontSize: 11, color: "#444" }}>
              {quizSection ? CONCEPTS.find(c => c.id === quizSection)?.title : "Full Quiz"} · <span style={{ color: "#34D399" }}>{score}</span>
            </span>
          </div>

          {/* progress bar */}
          <div style={{ height: 2, background: "#1a1a26", borderRadius: 1, marginBottom: 32 }}>
            <div style={{ height: 2, background: "#ede9e0", borderRadius: 1, width: `${((quizIndex + 1) / quizQuestions.length) * 100}%`, transition: "width 0.3s" }} />
          </div>

          <div style={{ marginBottom: 10, fontSize: 10, letterSpacing: 3, color: currentQ.color, textTransform: "uppercase" }}>{currentQ.category} — {currentQ.conceptTitle}</div>
          <div style={{ fontSize: 19, fontWeight: "bold", marginBottom: 28, lineHeight: 1.5 }}>{currentQ.q}</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {currentQ.options.map((opt, i) => {
              let bg = "#0f0f18", border = "#1a1a26", col = "#ede9e0";
              if (selected !== null) {
                if (i === currentQ.answer) { bg = "#0a1f12"; border = "#34D399"; col = "#34D399"; }
                else if (i === selected) { bg = "#1f0a0a"; border = "#FF6B6B"; col = "#FF6B6B"; }
                else { col = "#333"; }
              }
              return (
                <div key={i} onClick={() => handleAnswer(i)}
                  style={{ padding: "16px", background: bg, border: `1px solid ${border}`, borderRadius: 6, cursor: selected !== null ? "default" : "pointer", color: col, fontSize: 15, transition: "all 0.15s", lineHeight: 1.5, touchAction: "manipulation", minHeight: 52 }}
                  onMouseEnter={e => { if (selected === null) e.currentTarget.style.borderColor = "#333"; }}
                  onMouseLeave={e => { if (selected === null) e.currentTarget.style.borderColor = "#1a1a26"; }}>
                  {opt}
                </div>
              );
            })}
          </div>

          {selected !== null && (
            <div style={{ marginTop: 18 }}>
              <div style={{ padding: "16px", background: "#0a0f1a", border: "1px solid #1a2a3a", borderRadius: 6, marginBottom: 12 }}>
                <div style={{ fontSize: 9, letterSpacing: 2, color: "#60A5FA", textTransform: "uppercase", marginBottom: 8 }}>Why</div>
                <div style={{ fontSize: 13, color: "#888", lineHeight: 1.7 }}>{currentQ.explain}</div>
              </div>
              <button onClick={nextQuestion}
                style={{ width: "100%", padding: "16px", background: "#ede9e0", color: "#09090f", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 15, fontWeight: "bold", fontFamily: "inherit", touchAction: "manipulation", minHeight: 52 }}>
                {quizIndex + 1 >= quizQuestions.length ? "See results →" : "Next →"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* RESULTS */}
      {mode === "quiz" && finished && (
        <div style={{ maxWidth: 660, margin: "0 auto", padding: "36px 16px", paddingBottom: "max(48px, env(safe-area-inset-bottom))" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            {quizSection && (
              <div style={{ fontSize: 10, letterSpacing: 3, color: CONCEPTS.find(c => c.id === quizSection)?.color, textTransform: "uppercase", marginBottom: 8 }}>
                {CONCEPTS.find(c => c.id === quizSection)?.title}
              </div>
            )}
            <div style={{ fontSize: 72, fontWeight: "bold", color: scoreColor(pct), lineHeight: 1 }}>{pct}%</div>
            <div style={{ fontSize: 13, color: "#555", marginTop: 12 }}>
              {score} / {quizQuestions.length} · {pct >= 80 ? "Solid. Keep the pressure on." : pct >= 60 ? "Getting there. Review the misses below." : "Rough session — that's data. Review and retry."}
            </div>
          </div>

          {wrongAnswers.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 9, letterSpacing: 3, color: "#FF6B6B", textTransform: "uppercase", marginBottom: 14 }}>Missed — {wrongAnswers.length}</div>
              {wrongAnswers.map((w, i) => (
                <div key={i} style={{ padding: "18px", background: "#0f0f18", border: "1px solid #1f0a0a", borderRadius: 8, marginBottom: 10 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: w.color, textTransform: "uppercase", marginBottom: 8 }}>{w.conceptTitle}</div>
                  <div style={{ fontSize: 14, fontWeight: "bold", marginBottom: 12, lineHeight: 1.5 }}>{w.q}</div>
                  <div style={{ fontSize: 12, color: "#FF6B6B", marginBottom: 4 }}>You chose: {w.options[w.chosen]}</div>
                  <div style={{ fontSize: 12, color: "#34D399", marginBottom: 12 }}>Correct: {w.options[w.answer]}</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7, borderTop: "1px solid #1a1a26", paddingTop: 12 }}>{w.explain}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={resetQuiz}
              style={{ flex: 1, padding: "14px", background: "#ede9e0", color: "#09090f", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: "bold", fontFamily: "inherit", touchAction: "manipulation", minHeight: 52 }}>
              Try again
            </button>
            <button onClick={exitQuiz}
              style={{ flex: 1, padding: "14px", background: "transparent", color: "#666", border: "1px solid #2a2a3a", borderRadius: 6, cursor: "pointer", fontSize: 13, fontFamily: "inherit", touchAction: "manipulation", minHeight: 52 }}>
              {quizSection ? "← Sections" : "← Overview"}
            </button>
          </div>
        </div>
      )}

      {/* PROGRESS */}
      {mode === "progress" && (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "36px 16px", paddingBottom: "max(48px, env(safe-area-inset-bottom))" }}>

          {/* Full quiz history */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 14 }}>Full Quiz History</div>
            {progress.fullQuizHistory.length === 0 ? (
              <div style={{ padding: "18px", background: "#0f0f18", border: "1px solid #1a1a26", borderRadius: 6, fontSize: 13, color: "#333" }}>
                No full quizzes yet — go take one.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {progress.fullQuizHistory.map((run, i) => (
                  <div key={i} style={{ padding: "14px 16px", background: "#0f0f18", border: "1px solid #1a1a26", borderRadius: 6 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: "#555" }}>{run.date}</span>
                      <span style={{ fontSize: 18, fontWeight: "bold", color: scoreColor(run.pct) }}>{run.pct}%</span>
                      <span style={{ fontSize: 12, color: "#444" }}>{run.score}/{run.total}</span>
                    </div>
                    <div style={{ height: 4, background: "#1a1a26", borderRadius: 2 }}>
                      <div style={{ height: 4, background: scoreColor(run.pct), borderRadius: 2, width: `${run.pct}%`, transition: "width 0.6s" }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Per-section */}
          <div>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 14 }}>By Section</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {CONCEPTS.map(c => {
                const runs = progress.sectionHistory[c.id] || [];
                const a = getAvg(runs);
                return (
                  <div key={c.id} style={{ background: "#0f0f18", border: "1px solid #1a1a26", borderLeft: `3px solid ${c.color}`, borderRadius: 6, overflow: "hidden" }}>
                    {/* header */}
                    <div style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: a !== null ? 10 : 0 }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: "bold", color: c.color }}>{c.title}</div>
                          <div style={{ fontSize: 11, color: "#333", marginTop: 3 }}>
                            {runs.length === 0 ? "Not attempted" : `${runs.length} run${runs.length !== 1 ? "s" : ""} · avg ${a}%`}
                          </div>
                        </div>
                        {a !== null && (
                          <div style={{ fontSize: 24, fontWeight: "bold", color: scoreColor(a), lineHeight: 1 }}>{a}%</div>
                        )}
                      </div>
                      {a !== null && (
                        <div style={{ height: 4, background: "#1a1a26", borderRadius: 2 }}>
                          <div style={{ height: 4, background: scoreColor(a), borderRadius: 2, width: `${a}%`, transition: "width 0.6s" }} />
                        </div>
                      )}
                    </div>

                    {/* individual runs */}
                    {runs.length > 0 && (
                      <div style={{ borderTop: "1px solid #141420", padding: "10px 16px", display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {runs.map((run, i) => (
                          <div key={i} style={{ padding: "4px 9px", background: "#09090f", border: `1px solid ${scoreColor(run.pct)}33`, borderRadius: 4, fontSize: 11, display: "flex", gap: 6, alignItems: "center" }}>
                            <span style={{ color: "#444" }}>{run.date}</span>
                            <span style={{ fontWeight: "bold", color: scoreColor(run.pct) }}>{run.pct}%</span>
                            <span style={{ color: "#2a2a2a" }}>{run.score}/{run.total}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
