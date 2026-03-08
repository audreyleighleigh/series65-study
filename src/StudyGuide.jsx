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
  }
];

const allQuestions = CONCEPTS.flatMap(c =>
  c.quiz.map(q => ({ ...q, category: c.category, conceptTitle: c.title, color: c.color }))
);

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function StudyGuide() {
  const [mode, setMode] = useState("home");
  const [activeCard, setActiveCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [quizQuestions] = useState(() => shuffle(allQuestions));
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const concept = CONCEPTS[activeCard];
  const currentQ = quizQuestions[quizIndex];

  const handleAnswer = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === currentQ.answer) setScore(s => s + 1);
    else setWrongAnswers(w => [...w, { ...currentQ, chosen: i }]);
  };

  const nextQuestion = () => {
    if (quizIndex + 1 >= quizQuestions.length) setFinished(true);
    else { setQuizIndex(q => q + 1); setSelected(null); }
  };

  const resetQuiz = () => {
    setQuizIndex(0); setSelected(null); setScore(0);
    setFinished(false); setWrongAnswers([]);
  };

  const pct = Math.round((score / quizQuestions.length) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "#09090f", color: "#ede9e0", fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* NAV — offset by App top-bar height (~45px) */}
      <div style={{ borderBottom: "1px solid #1a1a26", padding: "18px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0c0c14", position: "sticky", top: 45, zIndex: 10 }}>
        <div>
          <span style={{ fontSize: 10, letterSpacing: 4, color: "#444", textTransform: "uppercase" }}>Series 65 · </span>
          <span style={{ fontSize: 10, letterSpacing: 4, color: "#444", textTransform: "uppercase" }}>Today's Misses</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[["home", "Overview"], ["flashcards", "Flashcards"], ["quiz", "Quiz"]].map(([m, label]) => (
            <button key={m} onClick={() => { setMode(m); setFlipped(false); }}
              style={{ padding: "7px 16px", background: mode === m ? "#ede9e0" : "transparent", color: mode === m ? "#09090f" : "#555", border: `1px solid ${mode === m ? "#ede9e0" : "#2a2a3a"}`, borderRadius: 3, cursor: "pointer", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontFamily: "inherit", transition: "all 0.15s" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* HOME */}
      {mode === "home" && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 28px" }}>
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 11, letterSpacing: 4, color: "#444", textTransform: "uppercase", margin: "0 0 12px" }}>Built from your session today</p>
            <h1 style={{ fontSize: 32, fontWeight: "normal", margin: "0 0 16px", lineHeight: 1.3 }}>{CONCEPTS.length} concepts. {allQuestions.length} questions.</h1>
            <p style={{ fontSize: 14, color: "#555", maxWidth: 520, lineHeight: 1.8, margin: 0 }}>
              Each card includes the spatial analogy that works for how you think. When stuck under exam pressure, go back to the physical space.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14, marginBottom: 48 }}>
            {CONCEPTS.map((c, i) => (
              <div key={c.id} onClick={() => { setActiveCard(i); setMode("flashcards"); setFlipped(false); }}
                style={{ padding: "22px", background: "#0f0f18", border: "1px solid #1a1a26", borderLeft: `3px solid ${c.color}`, borderRadius: 6, cursor: "pointer", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#141420"}
                onMouseLeave={e => e.currentTarget.style.background = "#0f0f18"}>
                <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 8 }}>{c.category}</div>
                <div style={{ fontSize: 15, fontWeight: "bold", color: c.color, marginBottom: 6 }}>{c.title}</div>
                <div style={{ fontSize: 11, color: "#444" }}>{c.quiz.length} question{c.quiz.length !== 1 ? "s" : ""}</div>
              </div>
            ))}
          </div>

          <div style={{ padding: "24px", background: "#0f0f18", border: "1px solid #1a1a26", borderRadius: 6 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 12 }}>Your memory stack</div>
            <div style={{ fontSize: 13, color: "#666", lineHeight: 1.9 }}>
              Strongest encoding: <span style={{ color: "#ede9e0" }}>spatial + visual</span> (warehouse, vending machine, rental unit).<br />
              Secondary: <span style={{ color: "#ede9e0" }}>narrative</span> — try building a character who walks through Grant → Exercise → Sale for ISO questions.<br />
              Numbers to own cold: <span style={{ color: "#ede9e0" }}>10% affiliate threshold · 1yr/2yr ISO holding · $83.33 conversion price math</span>
            </div>
          </div>
        </div>
      )}

      {/* FLASHCARDS */}
      {mode === "flashcards" && (
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <span style={{ fontSize: 11, color: "#444" }}>{activeCard + 1} of {CONCEPTS.length}</span>
            <div style={{ display: "flex", gap: 6 }}>
              {CONCEPTS.map((c, i) => (
                <div key={i} onClick={() => { setActiveCard(i); setFlipped(false); }}
                  style={{ width: 7, height: 7, borderRadius: "50%", background: i === activeCard ? c.color : "#222", cursor: "pointer", transition: "all 0.2s" }} />
              ))}
            </div>
          </div>

          <div onClick={() => setFlipped(f => !f)}
            style={{ background: "#0f0f18", border: `1px solid ${flipped ? concept.color + "55" : "#1a1a26"}`, borderLeft: `4px solid ${concept.color}`, borderRadius: 10, padding: "36px", minHeight: 300, cursor: "pointer", transition: "border-color 0.3s", userSelect: "none" }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 6 }}>{concept.category}</div>
            <div style={{ fontSize: 21, fontWeight: "bold", color: concept.color, marginBottom: 28 }}>{concept.title}</div>

            {!flipped ? (
              <div>
                <div style={{ fontSize: 14, color: "#666", fontStyle: "italic", lineHeight: 1.8, marginBottom: 24 }}>"{concept.analogy}"</div>
                <div style={{ fontSize: 10, color: "#333", letterSpacing: 2, textTransform: "uppercase" }}>tap to see the rule →</div>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: "#555", textTransform: "uppercase", marginBottom: 10 }}>The Rule</div>
                  <div style={{ fontSize: 15, color: "#ede9e0", lineHeight: 1.7, fontWeight: "bold" }}>{concept.rule}</div>
                </div>
                <div style={{ padding: "14px 18px", background: "#14130a", border: "1px solid #2a2800", borderRadius: 6 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: "#E8C547", textTransform: "uppercase", marginBottom: 8 }}>⚠ Watch out</div>
                  <div style={{ fontSize: 13, color: "#888", lineHeight: 1.7 }}>{concept.watch}</div>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "space-between" }}>
            <button onClick={() => { setActiveCard(n => Math.max(0, n - 1)); setFlipped(false); }} disabled={activeCard === 0}
              style={{ padding: "10px 22px", background: "transparent", color: activeCard === 0 ? "#2a2a2a" : "#666", border: `1px solid ${activeCard === 0 ? "#1a1a1a" : "#2a2a3a"}`, borderRadius: 4, cursor: activeCard === 0 ? "default" : "pointer", fontFamily: "inherit", fontSize: 12 }}>
              ← prev
            </button>
            <button onClick={() => setMode("quiz")}
              style={{ padding: "10px 22px", background: concept.color, color: "#09090f", border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: "bold" }}>
              quiz me
            </button>
            <button onClick={() => { setActiveCard(n => Math.min(CONCEPTS.length - 1, n + 1)); setFlipped(false); }} disabled={activeCard === CONCEPTS.length - 1}
              style={{ padding: "10px 22px", background: "transparent", color: activeCard === CONCEPTS.length - 1 ? "#2a2a2a" : "#666", border: `1px solid ${activeCard === CONCEPTS.length - 1 ? "#1a1a1a" : "#2a2a3a"}`, borderRadius: 4, cursor: activeCard === CONCEPTS.length - 1 ? "default" : "pointer", fontFamily: "inherit", fontSize: 12 }}>
              next →
            </button>
          </div>
        </div>
      )}

      {/* QUIZ */}
      {mode === "quiz" && !finished && (
        <div style={{ maxWidth: 660, margin: "0 auto", padding: "48px 28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
            <span style={{ fontSize: 11, color: "#444" }}>{quizIndex + 1} / {quizQuestions.length}</span>
            <span style={{ fontSize: 11, color: "#444" }}>Score: <span style={{ color: "#34D399" }}>{score}</span></span>
          </div>

          <div style={{ marginBottom: 10, fontSize: 10, letterSpacing: 3, color: currentQ.color, textTransform: "uppercase" }}>{currentQ.category} — {currentQ.conceptTitle}</div>
          <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 32, lineHeight: 1.5 }}>{currentQ.q}</div>

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
                  style={{ padding: "15px 18px", background: bg, border: `1px solid ${border}`, borderRadius: 6, cursor: selected !== null ? "default" : "pointer", color: col, fontSize: 14, transition: "all 0.15s", lineHeight: 1.5 }}
                  onMouseEnter={e => { if (selected === null) e.currentTarget.style.borderColor = "#333"; }}
                  onMouseLeave={e => { if (selected === null) e.currentTarget.style.borderColor = "#1a1a26"; }}>
                  {opt}
                </div>
              );
            })}
          </div>

          {selected !== null && (
            <div style={{ marginTop: 20 }}>
              <div style={{ padding: "16px 18px", background: "#0a0f1a", border: "1px solid #1a2a3a", borderRadius: 6, marginBottom: 14 }}>
                <div style={{ fontSize: 9, letterSpacing: 2, color: "#60A5FA", textTransform: "uppercase", marginBottom: 8 }}>Why</div>
                <div style={{ fontSize: 13, color: "#888", lineHeight: 1.7 }}>{currentQ.explain}</div>
              </div>
              <button onClick={nextQuestion}
                style={{ width: "100%", padding: "14px", background: "#ede9e0", color: "#09090f", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 14, fontWeight: "bold", fontFamily: "inherit" }}>
                {quizIndex + 1 >= quizQuestions.length ? "See results" : "Next →"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* RESULTS */}
      {mode === "quiz" && finished && (
        <div style={{ maxWidth: 660, margin: "0 auto", padding: "48px 28px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 72, fontWeight: "bold", color: pct >= 80 ? "#34D399" : pct >= 60 ? "#E8C547" : "#FF6B6B", lineHeight: 1 }}>{pct}%</div>
            <div style={{ fontSize: 13, color: "#555", marginTop: 12 }}>
              {score} / {quizQuestions.length} correct · {pct >= 80 ? "Solid. Keep the pressure on." : pct >= 60 ? "Getting there. Review the misses below." : "Rough session — that's data. Review and retry."}
            </div>
          </div>

          {wrongAnswers.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 9, letterSpacing: 3, color: "#FF6B6B", textTransform: "uppercase", marginBottom: 16 }}>Missed — {wrongAnswers.length} question{wrongAnswers.length !== 1 ? "s" : ""}</div>
              {wrongAnswers.map((w, i) => (
                <div key={i} style={{ padding: "20px", background: "#0f0f18", border: "1px solid #1f0a0a", borderRadius: 8, marginBottom: 10 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: w.color, textTransform: "uppercase", marginBottom: 8 }}>{w.conceptTitle}</div>
                  <div style={{ fontSize: 14, fontWeight: "bold", marginBottom: 12, lineHeight: 1.5 }}>{w.q}</div>
                  <div style={{ fontSize: 12, color: "#FF6B6B", marginBottom: 4 }}>You chose: {w.options[w.chosen]}</div>
                  <div style={{ fontSize: 12, color: "#34D399", marginBottom: 14 }}>Correct: {w.options[w.answer]}</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7, borderTop: "1px solid #1a1a26", paddingTop: 14 }}>{w.explain}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={resetQuiz}
              style={{ flex: 1, padding: "14px", background: "#ede9e0", color: "#09090f", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: "bold", fontFamily: "inherit" }}>
              Try again
            </button>
            <button onClick={() => setMode("home")}
              style={{ flex: 1, padding: "14px", background: "transparent", color: "#666", border: "1px solid #2a2a3a", borderRadius: 6, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>
              Back to overview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
