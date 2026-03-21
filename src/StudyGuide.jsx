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
    color: "#7EC8A4",
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
    color: "#F97316",
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
    color: "#E8C547",
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
    color: "#E8C547",
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
    color: "#FF6B6B",
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
    color: "#7EC8A4",
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
    color: "#FBBF24",
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
    color: "#E8C547",
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
    color: "#E8C547",
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
    color: "#60A5FA",
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
    color: "#7C3AED",
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
    color: "#FF6B6B",
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
    color: "#7C3AED",
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
    color: "#7C3AED",
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
    color: "#7C3AED",
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
    color: "#EC4899",
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
    color: "#EC4899",
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
    color: "#EC4899",
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
    color: "#EC4899",
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
    color: "#EC4899",
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
  },
  {
    id: "put-options",
    category: "Derivatives",
    title: "Put Options: Rights, Obligations & Strategies",
    color: "#A78BFA",
    analogy: "A put option is the opposite of a call. If a call is 'I have the right to buy your house at $150,000,' a put is 'I have the right to sell you my house at $150,000.' Long put = you own the right to sell. Short put = you sold someone that right and must buy if they exercise.",
    rule: "Put option = right to SELL at strike price. Long put (buyer): pays premium, profits if stock falls below strike. Short put (seller): collects premium, obligated to buy stock at strike if exercised. Put writers are neutral to bullish (happy if stock stays flat or rises — option expires worthless, they keep premium). Put buyers are bearish (betting stock drops).",
    watch: "Don't confuse long/short. Long put = buyer (you paid for the right). Short put = seller (you collected premium and have obligation). In suitability: a put buyer is bearish; a put seller is willing to own the stock at the strike price.",
    quiz: [
      {
        q: "A put option gives the holder the right to",
        options: [
          "Buy shares at the strike price",
          "Sell shares at the strike price",
          "Sell shares only at market price",
          "An obligation to purchase shares at the strike price"
        ],
        answer: 1,
        explain: "A put = right to SELL at the strike price. The buyer (long put) profits when the stock falls. The seller (short put) collects premium but is obligated to buy if the holder exercises. B is correct."
      },
      {
        q: "An investor who writes (sells) a put option is best characterized as",
        options: [
          "Bearish — expecting the stock to fall",
          "Neutral to bullish — willing to own the stock at the exercise price",
          "Highly bullish — expecting dramatic price increases",
          "Hedging against a long stock position"
        ],
        answer: 1,
        explain: "A put seller collects premium but is willing to buy the stock at the strike price if assigned. That means they're okay owning it at that price — either neutral or bullish. They're NOT bearish (that would be a put buyer). Put sellers profit if the stock stays flat or rises."
      }
    ]
  },
  {
    id: "long-call-short-put",
    category: "Derivatives",
    title: "Long Call vs Short Put: Unlimited Risk Profiles",
    color: "#A78BFA",
    analogy: "Long call = you paid to own an option (limited loss). Short put = you sold an option and took an obligation (limited by stock hitting zero, so capped loss). Short CALL or naked short STOCK = unlimited loss risk because prices can rise forever.",
    rule: "Long call: max loss = premium paid (capped). Max gain = unlimited (stock can rise infinitely). Short call: max gain = premium collected (capped). Max loss = unlimited (stock rises forever). Long put: max loss = premium paid. Max gain = capped (stock falls to zero). Short put: max loss = capped (stock falls to zero, you're forced to buy at strike). Max gain = premium collected.",
    watch: "Unlimited risk = short stock or naked short call (uncovered). Limited risk on both call and put sides if you own the option. Short stock has unlimited loss risk because prices can rise infinitely. Short put has CAPPED loss (stock floors at zero).",
    quiz: [
      {
        q: "Comparing max loss potential between a long call and a short uncovered put on the same stock",
        options: [
          "Long call has unlimited loss risk",
          "Short put has unlimited loss risk",
          "Both have unlimited loss risk",
          "Long call max loss is the premium; short put max loss is capped at zero"
        ],
        answer: 3,
        explain: "Long call: you paid the premium — that's your max loss if it expires worthless. Short put: you collected premium but are obligated to buy at the strike. Stock can only fall to zero, so your max loss = (strike price × shares) − premium collected. Capped at zero. Unlimited risk only applies to short stock or naked short calls."
      }
    ]
  },
  {
    id: "covered-calls-detailed",
    category: "Derivatives",
    title: "Covered Calls: Locked-In Income in Flat Markets",
    color: "#A78BFA",
    analogy: "You own a house worth $150,000. You're not sure it will appreciate, but you want income. So you offer a neighbor the right to buy your house at $150,000 for $2,000. You collect $2,000 immediately. Three outcomes: (1) neighbor never exercises — you keep the house AND the $2,000. (2) Price rises to $200,000 — neighbor exercises, you sell at your $150,000 strike, missing the upside (but you've locked in your profit). (3) Price falls to $100,000 — neighbor walks away, you keep house + $2,000. The write-off cost is the upside you gave away.",
    rule: "Covered call = own 100 shares, sell (write) one call for every 100 shares. You collect premium (income) immediately. If assigned, you sell your shares at the strike price. Max profit = strike price + premium collected. Max loss = limited to covered shares (you own them). Not suitable when you expect strong bullish moves (you cap your upside). Best for neutral/flat market outlook when you want income without selling shares.",
    watch: "Covered = you own the underlying shares, so you have no naked short risk. You can only be called away at the strike price. Premium collected reduces your breakeven cost. Don't use covered calls if you expect sharp upside — you're capping profits.",
    quiz: [
      {
        q: "A client owns 400 shares of XYZ at $150 and does not expect the price to change significantly. Which strategy would generate income in this flat market?",
        options: [
          "Buy 4 XYZ 150 calls",
          "Write 4 XYZ 150 calls",
          "Buy 4 XYZ 150 puts",
          "Buy 4 XYZ 150 calls and write 4 XYZ 150 puts"
        ],
        answer: 1,
        explain: "Writing (selling) calls on the shares generates income via premium collection. 400 shares = 4 contracts (100 shares each). The client already owns the shares (covered), so writing calls is appropriate for a flat outlook. Buying calls or puts costs money — the opposite of what's needed here."
      },
      {
        q: "If an investor writes a call option on stock they own (covered call) and the stock rises significantly above the strike price",
        options: [
          "The investor keeps the premium and the stock",
          "The investor keeps the premium but loses the stock at the strike price",
          "The investor loses both the premium and the stock",
          "The investor has unlimited gain potential"
        ],
        answer: 1,
        explain: "If assigned, the investor sells shares at the strike price (the agreed price when they wrote the call). They keep the premium collected, but they gave up the opportunity to profit from the price rise above the strike. That's the trade-off of a covered call — capped upside in exchange for premium income."
      }
    ]
  },
  {
    id: "options-commission",
    category: "Derivatives",
    title: "Options Commission Calculations: Tiered Brackets",
    color: "#A78BFA",
    analogy: "Options commission works like bulk pricing at a warehouse. Small order = higher per-unit cost. Large order = lower per-unit cost. The difference is your tiered commission bracket — different fixed + percentage rates depending on order size.",
    rule: "Options commission structure uses tiered brackets: $0–$2,500 (one rate), $2,501–$11,999 (lower rate), $12,000+ (even lower). Formula: $base + (percentage × total trade value). Trade value = contract premium × shares per contract × number of contracts. Example: 5 contracts at $7 premium = 5 × 100 × $7 = $3,500 → falls into $2,501–$11,999 bracket → apply that bracket's rate.",
    watch: "Trade value is premium × 100 (shares per contract) × number of contracts. NOT just premium × contracts. Know which bracket each trade value falls into and apply the correct formula. Commissions are calculated on the total trade value, not per contract.",
    quiz: [
      {
        q: "An investor buys 5 options contracts at a premium of $7 per share. Each contract covers 100 shares. Commission brackets: $0–$2,500 = $35 + 0.2%; $2,501–$11,999 = $35 + 0.7%; $12,000+ = $35 + 0.5%. What is the commission?",
        options: ["$35.50", "$59.50", "$175.00", "$525.00"],
        answer: 1,
        explain: "Trade value = 5 contracts × 100 shares × $7 = $3,500. Falls into $2,501–$11,999 bracket. Commission = $35 + (0.7% × $3,500) = $35 + $24.50 = $59.50."
      }
    ]
  },
  {
    id: "options-straddles",
    category: "Derivatives",
    title: "Straddles: Profiting from Big Moves in Either Direction",
    color: "#A78BFA",
    analogy: "A straddle is like betting that something will happen — you don't care which direction. Buy a call AND a put at the same strike price. You profit if the stock moves a lot either way, and lose if it stays flat. It's expensive (two premiums), but you win on volatility.",
    rule: "Long straddle = long call + long put, same strike, same expiration. Profit on big moves in either direction. Max loss = both premiums paid if stock ends at strike. Max gain = unlimited on upside, capped on downside (stock falls to zero). Used when expecting high volatility but unsure of direction. Short straddle = opposite — sell call + sell put, profit if stock stays flat, lose on big moves.",
    watch: "Straddles require paying two premiums (expensive entry). Profit only if the move is larger than the total premium paid. Short straddle has unlimited risk (short call). Long straddle has capped risk. Suitable for volatile markets, unsuitable for stable markets.",
    quiz: [
      {
        q: "An investor establishes a long straddle by buying an ABC 100 call for $5 and an ABC 100 put for $3. What is the maximum loss?",
        options: ["$3", "$5", "$800", "Unlimited"],
        answer: 2,
        explain: "Maximum loss on a long straddle = total premiums paid = $5 + $3 = $8 per share = $800 for a standard (100-share) contract. This happens if the stock closes exactly at the strike ($100) and both options expire worthless."
      }
    ]
  },
  {
    id: "options-suitability",
    category: "Derivatives",
    title: "Options Suitability: Time Horizon & Risk Profile Matching",
    color: "#A78BFA",
    analogy: "Selling naked calls (unlimited risk) is like being an uninsured homeowner in a hurricane — if it hits, you could lose everything. Buying calls (limited loss) is like insurance — expensive, but your max loss is the premium. Suitability means matching the strategy to the client's risk tolerance and investment horizon.",
    rule: "Long options (buyer): suitable for investors comfortable with limited, known loss (premium paid). Covered calls: suitable for conservative income seekers with stable outlook. Naked uncovered calls: NEVER suitable (unlimited risk). Short puts: suitable only for accredited investors comfortable with buying stock if assigned. Straddles/complex strategies: accredited clients only. Retirement accounts: generally only long calls/puts or covered calls (not short/naked).",
    watch: "Naked short calls = unlimited loss, unsuitable for most clients. Short puts can obligate purchase, must be suitable for stock price. Recommend to match client risk tolerance. Conservative = covered calls or long options. Aggressive/accredited = more complex strategies, but still match to risk profile.",
    quiz: [
      {
        q: "Which options strategy would be LEAST appropriate for a conservative investor focused on retirement income?",
        options: [
          "Writing covered calls on dividend-paying stocks",
          "Buying protective puts on an existing stock position",
          "Writing naked uncovered calls",
          "Buying long-dated call options for stock that may appreciate"
        ],
        answer: 2,
        explain: "Naked uncovered calls have unlimited risk and are unsuitable for most clients, especially conservative ones. Covered calls and protective puts are income/protection strategies. Even buying calls has limited risk (premium paid). Naked calls = C is the clearly unsuitable choice."
      }
    ]
  },
  {
    id: "business-cycle-phases",
    category: "Global",
    title: "Business Cycle Phases",
    color: "#60A5FA",
    analogy: "Think of the business cycle like a roller coaster. The climb is expansion, the top of the hill is the peak, the descent is contraction, and the bottom of the dip is the trough — before the next climb (recovery) begins. You always know where you are by looking at which direction the car is moving.",
    rule: "The business cycle has four phases in order: **Expansion → Peak → Contraction → Trough → Recovery**. The **peak** is the highest point of economic activity before decline begins; the **trough** is the lowest point before recovery. A contraction lasting two or more consecutive quarters is technically a recession.",
    watch: "The exam often asks what happens *immediately before* the trough — the answer is always **contraction**, not peak. Peak comes two phases before the trough. Don't let the question's phrasing pull you one phase too early.",
    quiz: [
      {
        q: "When analyzing the business cycle, which phase occurs immediately before the trough?",
        options: [
          "Expansion",
          "Peak",
          "Contraction",
          "Recovery"
        ],
        answer: 2,
        explain: "The correct sequence is Expansion → Peak → Contraction → Trough → Recovery. Contraction (declining economic activity) directly precedes the trough (the cycle's lowest point). Peak occurs two phases before the trough, not one. Recovery follows the trough."
      },
      {
        q: "An economy has been experiencing declining GDP, rising unemployment, and falling consumer spending for several months. Which phase of the business cycle best describes this?",
        options: [
          "Peak",
          "Trough",
          "Recovery",
          "Contraction"
        ],
        answer: 3,
        explain: "Declining GDP, rising unemployment, and falling spending are hallmarks of contraction. The trough is the single lowest point — not the decline itself. Recovery features improving indicators. The peak is the high point before decline begins."
      },
      {
        q: "Which phase of the business cycle would most likely be characterized by maximum employment, high consumer confidence, and peak corporate profits?",
        options: [
          "Trough",
          "Recovery",
          "Contraction",
          "Peak"
        ],
        answer: 3,
        explain: "The peak represents the height of economic activity — employment is at its highest, confidence is strong, and profits are maximized. This is the inflection point before contraction begins. The trough is the opposite extreme. Recovery is improving but not yet at maximum. Contraction is a period of decline."
      }
    ]
  },
  {
    id: "fed-monetary-policy-tools",
    category: "Global",
    title: "Federal Reserve Monetary Policy Tools",
    color: "#60A5FA",
    analogy: "Picture the Fed as a plumber with three valves controlling water pressure (money supply) in the economy. The discount rate valve controls how cheaply banks can refill from the main pipe. The reserve requirement valve controls how much water each bank must keep in its tank. The FOMC valve (open market operations) adds or drains water directly from the system by buying or selling government bonds.",
    rule: "The Fed's three direct monetary policy tools are: **(1) the discount rate** — the rate it charges banks for direct loans; **(2) reserve requirements** — the percentage of deposits banks must hold in reserve; and **(3) open market operations** — conducted by the **FOMC**, which buys/sells Treasury securities to expand or contract the money supply. The **prime rate** is *not* a Fed tool — it is set by commercial banks, typically ~3% above the federal funds rate.",
    watch: "Don't confuse the **prime rate** with the **discount rate**. The Fed *sets* the discount rate directly; the prime rate is set by commercial banks in response to Fed policy but is not controlled by the Fed. The exam loves to include prime rate as a trap answer.",
    quiz: [
      {
        q: "Which of the following is NOT a tool the Federal Reserve uses to influence the money supply?",
        options: [
          "The discount rate",
          "The prime rate",
          "Reserve requirements",
          "Open market operations"
        ],
        answer: 1,
        explain: "The prime rate is set by commercial banks (typically 3% above the federal funds rate) and is not directly controlled by the Fed. The discount rate, reserve requirements, and open market operations (conducted by the FOMC) are all tools the Fed directly controls."
      },
      {
        q: "The Federal Reserve wants to stimulate a slowing economy. Which action by the FOMC would accomplish this?",
        options: [
          "Selling Treasury securities",
          "Increasing reserve requirements",
          "Buying Treasury securities",
          "Raising the discount rate"
        ],
        answer: 2,
        explain: "When the FOMC buys Treasury securities, it injects money into the banking system, expanding the money supply and stimulating economic activity. Selling securities would drain money (contractionary). Raising reserve requirements or the discount rate are also contractionary — they restrict how much banks can lend."
      },
      {
        q: "Which Federal Reserve body is responsible for conducting open market operations?",
        options: [
          "The Board of Governors",
          "The Federal Advisory Council",
          "The Federal Open Market Committee (FOMC)",
          "The Office of the Comptroller"
        ],
        answer: 2,
        explain: "The FOMC conducts open market operations — buying and selling Treasury securities to influence the money supply. The Board of Governors oversees the Fed broadly. The Federal Advisory Council is an advisory body with no policy authority. The OCC is a separate agency regulating national banks."
      }
    ]
  },
  {
    id: "monetarist-theory",
    category: "Global",
    title: "Monetarist Economic Theory",
    color: "#60A5FA",
    analogy: "Monetarism is the 'thermostat theory' of economics. The money supply is the thermostat — keep it at a slow, steady setting and the economy stays comfortable. Crank it up suddenly and you get inflation (overheating). Slam it down and you get recession (a freeze). The monetarist prescription: set a predictable rate of growth and leave it alone.",
    rule: "Monetarism holds that the **money supply is the primary determinant of price levels** over time. Monetarists believe the Federal Reserve should grow the money supply at a **gradual, steady, and predictable rate** roughly in line with real economic growth. They favor monetary policy over fiscal policy, and steady rules over active intervention.",
    watch: "Don't confuse monetarism with classical economics (which says money doesn't matter) or Keynesianism (which favors active fiscal and monetary intervention). Also watch for options that reverse causality — monetarists believe the money supply influences interest rates, not the other way around.",
    quiz: [
      {
        q: "Which of the following statements best reflects the monetarist economic position?",
        options: [
          "The amount of money in the economy determines price levels; the Fed should grow the money supply gradually and predictably",
          "Economic activity reflects real goods and services; the Fed should not attempt to manage the money supply",
          "The best way to control prices is to raise taxes and reduce the amount of money in the economy",
          "The total amount of money in the economy is determined by the level of interest rates"
        ],
        answer: 0,
        explain: "Monetarism holds that the money supply drives price levels, and the Fed's best role is stable, predictable money supply growth. Option B describes classical/real business cycle theory, which downplays money's importance. Option C describes a fiscal policy approach — monetarists rely on monetary tools, not taxation. Option D reverses the causality; monetarists believe money supply influences interest rates, not the reverse."
      },
      {
        q: "A monetarist economist is asked how the Federal Reserve should respond to a sudden spike in inflation. What approach would she most likely recommend?",
        options: [
          "Dramatically increase government spending to stimulate real output",
          "Raise taxes to remove money from the economy",
          "Reduce the rate of money supply growth back to a slow, steady level",
          "Let market forces correct the imbalance without Fed intervention"
        ],
        answer: 2,
        explain: "Monetarists believe inflation is caused by excessive money supply growth, so the solution is to slow that growth back to a predictable rate. Option A is a Keynesian fiscal response. Option B is also fiscal, not monetary. Option D is closer to classical economics. Monetarists support Fed action — but through steady money supply management, not dramatic intervention."
      }
    ]
  },
  {
    id: "interest-rate-hierarchy",
    category: "Global",
    title: "Interest Rate Hierarchy",
    color: "#60A5FA",
    analogy: "Think of interest rates as a lending chain. The Fed lends to banks (discount rate). Banks lend to each other overnight (federal funds rate). Banks lend to their best customers (prime rate). Banks lend to brokers for margin accounts (call loan rate). Each step moves one level further from the Fed and one level closer to the end investor.",
    rule: "**Federal funds rate**: rate banks charge each other for overnight loans of excess reserves — the Fed *targets* this rate but doesn't set it directly. **Discount rate**: rate the Fed charges banks that borrow directly from it (the 'discount window') — set above the fed funds rate. **Prime rate**: rate banks charge their most creditworthy customers — typically ~3% above the federal funds rate. **Call loan rate**: rate banks charge broker-dealers for margin account financing.",
    watch: "Don't confuse the federal funds rate with the discount rate. Both involve banks borrowing, but the federal funds rate is bank-to-bank, while the discount rate is Fed-to-bank. The fed funds rate is negotiated between banks; the discount rate is set by the Fed directly.",
    quiz: [
      {
        q: "Overnight loans between banks are made at:",
        options: [
          "The federal funds rate",
          "The prime rate",
          "The call loan rate",
          "The discount rate"
        ],
        answer: 0,
        explain: "The federal funds rate is specifically the rate banks charge each other for overnight lending of excess reserves. The discount rate is what the Fed charges banks — not what banks charge each other. The prime rate is for a bank's best customers. The call loan rate is for broker-dealers financing margin accounts."
      },
      {
        q: "A bank is short on reserves at the end of the day and borrows directly from the Federal Reserve. This loan is made at:",
        options: [
          "The federal funds rate",
          "The prime rate",
          "The call loan rate",
          "The discount rate"
        ],
        answer: 3,
        explain: "When a bank borrows directly from the Federal Reserve through the discount window, it pays the discount rate. The federal funds rate applies to bank-to-bank overnight lending, not Fed-to-bank lending. Banks typically prefer the federal funds market and only use the discount window as a last resort, partly because the discount rate is set above the federal funds rate."
      },
      {
        q: "Which of the following correctly ranks these rates from lowest to highest in a typical interest rate environment?",
        options: [
          "Prime rate → Federal funds rate → Discount rate",
          "Federal funds rate → Discount rate → Prime rate",
          "Discount rate → Federal funds rate → Prime rate",
          "Federal funds rate → Prime rate → Discount rate"
        ],
        answer: 1,
        explain: "In a typical environment, the federal funds rate is lowest (bank-to-bank, most efficient market), the discount rate is set slightly above it (to discourage overreliance on the Fed's discount window), and the prime rate is highest of the three at roughly 3% above the federal funds rate (reflecting the additional credit risk of lending to customers vs. other banks)."
      }
    ]
  },
  {
    id: "currency-devaluation-effects",
    category: "Global",
    title: "Currency Devaluation & Trade Effects",
    color: "#60A5FA",
    analogy: "Devaluing your currency is like putting your entire country's goods on sale for foreign shoppers. Foreigners flood in to buy your now-cheaper exports, while your own citizens find imported goods suddenly expensive and pull back. Your country takes in more than it spends — recording a net credit to the trade account.",
    rule: "When a country devalues its currency: **(1) exports increase** — domestic goods become cheaper for foreign buyers; **(2) imports decrease** — foreign goods become more expensive domestically; **(3) the trade account receives a credit** — rising exports and falling imports improve the trade balance. A credit = net inflow; a debit = net outflow.",
    watch: "Students often confuse the direction of the trade account entry. Exports = money flowing *in* = credit. Imports = money flowing *out* = debit. Devaluation boosts exports and shrinks imports, so the net effect is a *credit* to the trade account — not a debit. Also don't fall for the trap that imports increase after devaluation; they actually fall because foreign goods get more expensive.",
    quiz: [
      {
        q: "Among the effects of a country devaluating its currency, which of the following would most likely occur? I. A credit to the trade account II. A debit to the trade account III. An increase in exports IV. An increase in imports",
        options: [
          "I and IV",
          "II and III",
          "I and III",
          "II and IV"
        ],
        answer: 2,
        explain: "Devaluation makes domestic goods cheaper for foreign buyers, increasing exports (III). It makes foreign goods more expensive domestically, decreasing imports — not increasing them, so IV is wrong. Rising exports bring money into the country, recording a credit to the trade account (I), not a debit (II). Therefore I and III is correct."
      },
      {
        q: "Country X devalues its currency by 15%. What is the most likely immediate effect on its balance of trade?",
        options: [
          "Trade deficit widens as imports surge",
          "Trade balance improves as exports rise and imports fall",
          "No effect — trade flows are determined by real factors, not currency values",
          "Trade surplus disappears as foreign demand falls"
        ],
        answer: 1,
        explain: "Devaluation makes a country's goods cheaper abroad (boosting exports) and foreign goods more expensive domestically (reducing imports). Both effects move the trade balance in a positive direction — improving it. A widening deficit would require the opposite conditions. Option C reflects a classical economics view, not how currency effects work in practice."
      }
    ]
  },
  {
    id: "balance-of-payments-credits-debits",
    category: "Global",
    title: "Balance of Payments: Credits & Debits",
    color: "#60A5FA",
    analogy: "Think of the balance of payments like a national checkbook. Any transaction that brings money INTO the country is a deposit — a credit. Any transaction that sends money OUT of the country is a withdrawal — a debit. When a foreigner buys a U.S. apartment, they're depositing money into the U.S. economy. When a U.S. tourist spends money in Paris, they're withdrawing from it.",
    rule: "In the balance of payments, **credits = money flowing in** (exports, foreign investment in the U.S., foreign tourists spending here, loan repayments received). **Debits = money flowing out** (imports, U.S. investment abroad, U.S. tourists spending overseas, loans made to foreigners). The key question is always: *which direction does the cash actually move?*",
    watch: "The most common trap is confusing the *perspective*. Foreign residents buying assets *here* is a credit — their money flows into the U.S. U.S. residents buying assets *abroad* is a debit — our money flows out. The nationality of the buyer matters less than the direction of the money flow.",
    quiz: [
      {
        q: "Which of the following would lead to a debit to the U.S. foreign account balance?",
        options: [
          "Foreign governments repaying loans to U.S. banks",
          "Residents of other countries buying apartments in the U.S.",
          "An increase in U.S. exports",
          "U.S. residents taking vacations abroad"
        ],
        answer: 3,
        explain: "U.S. residents vacationing abroad send money out of the country — a debit. Option A brings money in (loan repayment received = credit). Option B brings money in (foreigners investing in U.S. real estate = credit). Option C brings money in (export payments received = credit). Only D represents an outflow of U.S. dollars."
      },
      {
        q: "A Japanese automaker builds a new factory in Ohio. How does this transaction affect the U.S. balance of payments?",
        options: [
          "Debit — the U.S. is taking on a foreign liability",
          "Credit — foreign capital is flowing into the U.S.",
          "Debit — manufacturing capacity is being built by a foreign entity",
          "No effect — only goods transactions affect the balance of payments"
        ],
        answer: 1,
        explain: "Foreign direct investment INTO the U.S. is a credit — money flows in from Japan to build the factory. The balance of payments records all international transactions, not just goods. Option A incorrectly frames inbound investment as a liability. Option C gets the direction backwards. Option D is wrong — capital account transactions absolutely affect the balance of payments."
      }
    ]
  },
  {
    id: "recession-definition",
    category: "Global",
    title: "Recession Definition",
    color: "#60A5FA",
    analogy: "One bad month doesn't make a winter. A recession is like a cold snap that has to last at least two full seasons (quarters) before meteorologists officially call it a pattern. One down quarter is a blip; two in a row is a trend.",
    rule: "A **recession** is formally defined as a decline in GDP for **two consecutive quarters** (six months). A single quarter of negative growth does not qualify. This threshold distinguishes a temporary economic shock from a sustained contraction in the business cycle.",
    watch: "The exam will offer three, four, and six quarters as tempting alternatives. The answer is always two — no more, no less. Don't confuse the number of quarters with the number of months (two quarters = six months).",
    quiz: [
      {
        q: "A recession is defined as a drop in GDP for:",
        options: [
          "Three consecutive quarters",
          "Six consecutive quarters",
          "Four consecutive quarters",
          "Two consecutive quarters"
        ],
        answer: 3,
        explain: "The standard definition of a recession is two consecutive quarters of declining GDP. One quarter of negative growth is considered a temporary blip. Three, four, and six quarters are all too long — the threshold is specifically two consecutive quarters."
      }
    ]
  },
  {
    id: "fiscal-vs-monetary-policy",
    category: "Global",
    title: "Fiscal vs. Monetary Policy",
    color: "#60A5FA",
    analogy: "Think of the economy as a car with two sets of controls. The government (president and Congress) controls the gas and brake pedals — that's fiscal policy: taxing and spending. The Federal Reserve controls the engine temperature — that's monetary policy: managing the money supply and interest rates. The two drivers work independently and use completely different levers.",
    rule: "**Fiscal policy** = government taxation and spending decisions, made by the president and Congress. Stimulative fiscal policy means **cutting taxes** or **increasing spending**. Contractionary fiscal policy means **raising taxes** or **cutting spending**. **Monetary policy** = the Fed's control of money supply and interest rates. These are entirely separate toolkits — money supply adjustments are NEVER fiscal tools.",
    watch: "The exam frequently includes 'increase the money supply' as a trap answer on fiscal policy questions. The moment you see money supply, discount rate, or reserve requirements, that's monetary policy — not fiscal. Fiscal policy only involves taxing and spending.",
    quiz: [
      {
        q: "To stimulate a sluggish economy using fiscal policy measures, policymakers would:",
        options: [
          "Reduce income taxes",
          "Increase the money supply",
          "Increase income taxes",
          "Reduce the money supply"
        ],
        answer: 0,
        explain: "Reducing income taxes is a fiscal stimulus tool — it puts more money in consumers' pockets, boosting spending and economic activity. Options B and D involve the money supply, which is monetary policy (the Fed's domain), not fiscal policy. Option C (raising taxes) is contractionary fiscal policy — the opposite of stimulus."
      },
      {
        q: "Which of the following is an example of contractionary fiscal policy?",
        options: [
          "The Fed raises the discount rate",
          "The Fed increases reserve requirements",
          "Congress passes a bill increasing income tax rates",
          "The FOMC sells Treasury securities"
        ],
        answer: 2,
        explain: "Raising income tax rates is contractionary fiscal policy — it removes money from the economy by increasing the government's take. Options A, B, and D are all monetary policy tools controlled by the Federal Reserve, not fiscal tools. Fiscal policy is exclusively about government taxing and spending."
      }
    ]
  },
  {
    id: "yield-curve-analysis",
    category: "Bonds",
    title: "Yield Curve Analysis: What It Compares",
    color: "#E8C547",
    analogy: "A yield curve is a ruler measuring the 'price of time' in the bond market. For that ruler to be accurate, every notch must represent only the passage of time — not a different borrower or level of risk. Using a single issuer (like the U.S. government) is the strictest way to guarantee that. The moment you introduce a second issuer, even one of similar quality, you've introduced a tiny bend in the ruler.",
    rule: "Yield curve analysis compares bonds from a **single issuer across varying maturities**. Using one issuer eliminates all credit risk variation, so the only remaining explanation for yield differences is time — which is exactly what the curve is designed to measure. In practice, **U.S. Treasury securities** (T-bills, T-notes, T-bonds) are the standard, spanning maturities from 1 month to 30 years under one issuer: the U.S. government.",
    watch: "'Similar quality over varying maturities' sounds right but is too loose — even two AAA-rated bonds from different issuers carry subtle differences in credit risk, sector exposure, and liquidity that contaminate the yield comparison. The exam answer is *single issuer*, not just similar quality. Also watch for 'varying quality over varying maturities' — that's credit spread analysis, a completely different tool.",
    quiz: [
      {
        q: "An investor using yield curve analysis would expect to view bonds of:",
        options: [
          "Varying quality over a number of maturities",
          "Similar quality over varying maturities",
          "A single issuer over varying maturities",
          "Varying quality of similar maturities"
        ],
        answer: 2,
        explain: "Yield curve analysis requires bonds from a single issuer across varying maturities. A single issuer eliminates all credit risk variation, leaving maturity as the only variable — which is exactly what the curve measures. 'Similar quality' (option B) is too loose; even closely rated bonds from different issuers introduce subtle yield differences unrelated to maturity. Options A and D mix quality variation into the comparison, which is credit spread analysis, not yield curve analysis."
      },
      {
        q: "Why are U.S. Treasury bonds most commonly used to construct a yield curve?",
        options: [
          "They offer the highest yields across all maturities",
          "They are issued in the widest range of denominations",
          "They come from a single issuer and span a wide range of maturities",
          "They are the only bonds whose yields are set directly by the Federal Reserve"
        ],
        answer: 2,
        explain: "Treasuries are ideal for yield curve construction because they all come from one issuer (the U.S. government), eliminating credit risk as a variable, and they span maturities from 1 month to 30 years. This gives a clean, pure picture of how time affects yield. Treasuries don't offer the highest yields — junk bonds do. And the Fed doesn't set Treasury yields; the market does through supply and demand."
      }
    ]
  },
  {
    id: "inflation-inertia",
    category: "Global",
    title: "Inflation Inertia",
    color: "#60A5FA",
    analogy: "Inflation inertia is like a slow-burning fuse. The initial burn is quiet and gradual — easy to overlook. But once it reaches the powder keg (an economic shock), the rate of price increases suddenly accelerates. The danger is in the buildup phase: by the time the acceleration is obvious, the process is already well underway and hard to stop.",
    rule: "**Inflation inertia** describes a pattern where prices rise **slowly during an initial period of inflation**, then **begin to accelerate** as a result of an economic shock. The 'inertia' refers to the quiet buildup phase — underlying inflationary pressure accumulates gradually before becoming visible as rapid price increases.",
    watch: "The word 'inertia' naturally suggests things staying the same — don't fall for that. Inflation inertia is NOT about prices holding steady at a constant rate. It's specifically about a slow start that accelerates due to an economic shock. 'Prices remain the same for a protracted period' is the classic wrong answer this concept generates.",
    quiz: [
      {
        q: "Proponents of the concept of inflation inertia believe that:",
        options: [
          "The rate of inflation will parallel the Consumer Price Index",
          "Prices will rise slowly and then begin to increase at a faster rate",
          "Prices will remain the same for a protracted period of time",
          "Prices will rise rapidly and then begin to contract"
        ],
        answer: 1,
        explain: "Inflation inertia holds that prices rise slowly during an initial period, then accelerate as a result of an economic shock. Option C is the most tempting wrong answer — 'inertia' suggests staying put, but that's not the concept. Option A conflates inflation with its measurement tool. Option D describes a spike-and-reversal, which is the opposite of an inertia-driven buildup."
      },
      {
        q: "Which of the following best describes the mechanism behind inflation inertia?",
        options: [
          "Inflation holds steady at a fixed rate due to long-term wage contracts",
          "Prices initially rise gradually, then accelerate sharply following an economic shock",
          "The Federal Reserve keeps inflation constant through predictable money supply growth",
          "Inflation mirrors GDP growth over time, rising and falling with the business cycle"
        ],
        answer: 1,
        explain: "Inflation inertia describes a two-phase process: a slow, quiet buildup followed by acceleration triggered by an economic shock. Option A describes a different concept — the idea that contracts lock in a steady inflation rate. Option C describes monetarist policy prescription. Option D describes a relationship between inflation and the business cycle that doesn't capture the inertia dynamic."
      }
    ]
  },
  {
    id: "sector-rotation-business-cycle",
    category: "Equities",
    title: "Sector Rotation & the Business Cycle",
    color: "#7EC8A4",
    analogy: "Think of sector rotation like adjusting your wardrobe for the season. When summer (expansion) is coming, you load up on light clothes (cyclical and growth stocks). When you can feel summer ending and fall (contraction) approaching, you swap to heavier layers (defensive stocks). You don't wait until it's cold — you rotate ahead of the change.",
    rule: "**Cyclical stocks** (autos, airlines, luxury, homebuilders) perform well during expansion and poorly during contraction — their revenues are highly sensitive to economic conditions. **Defensive stocks** (utilities, healthcare, consumer staples) hold value through contractions because demand for their products is inelastic. The standard rotation: shift toward **defensives** as the economy approaches its **peak** (contraction incoming); shift back to **cyclicals** as the economy approaches the **trough** (recovery incoming).",
    watch: "The rotation happens *in anticipation* of the next phase, not after it arrives. If the peak is two months away, you rotate into defensives NOW. Also don't confuse defensive stocks with bonds — both hold up in downturns, but if the question asks about equity portfolio adjustments specifically, defensive stocks are the answer.",
    quiz: [
      {
        q: "A research team forecasts the business cycle will reach its peak within two months. Which portfolio adjustment is most suitable for clients who actively invest in common stocks?",
        options: [
          "Corporate bonds",
          "Defensive stocks",
          "Aggressive growth stocks",
          "Cyclical stocks"
        ],
        answer: 1,
        explain: "A peak means contraction is imminent. Defensive stocks (utilities, healthcare, consumer staples) hold up well during contractions because demand for their products is inelastic. Cyclical stocks would be the worst choice — they fall hardest during contractions. Aggressive growth stocks are even more vulnerable. Corporate bonds may be appropriate but the question asks about equity portfolio adjustments specifically."
      },
      {
        q: "An investor believes the economy is near its trough and recovery is approaching. Which type of stock would be most appropriate to emphasize in a portfolio?",
        options: [
          "Defensive stocks",
          "Utility stocks",
          "Cyclical stocks",
          "Dividend-paying preferred stocks"
        ],
        answer: 2,
        explain: "Near the trough, recovery is the next phase — meaning economic activity will increase, consumer spending will rise, and cyclical companies will see improving revenues. This is the ideal time to rotate INTO cyclical stocks to capture the upside of the recovery. Defensive stocks and utilities are appropriate during contraction but underperform during expansion. Preferred stocks are an income instrument, not an equity growth play tied to the business cycle."
      }
    ]
  },
  {
    id: "cash-flow-investing-activities",
    category: "Equities",
    title: "Cash Flow Statement: Investing Activities",
    color: "#7EC8A4",
    analogy: "Think of a company like a restaurant. Operating cash flow is the daily register — food sales, paying suppliers, collecting tips. Investing cash flow is what happens when the owner buys a new oven or sells the building next door. Financing cash flow is when the owner takes out a loan or pays back investors. Each bucket tracks a fundamentally different kind of money movement.",
    rule: "The cash flow statement has three sections: **Operating** (day-to-day business, including interest/dividends received), **Investing** (purchase and sale of long-term assets like land, buildings, equipment, and non-resale securities), and **Financing** (issuing or retiring debt/equity, paying dividends). Investing activities = transactions involving assets the company intends to hold, not resell.",
    watch: "Interest and dividends *received* feel like investing activities but are classified as **operating**. Issuing stocks or bonds and paying dividends feel like investing but are **financing**. The exam exploits both of these instincts.",
    quiz: [
      {
        q: "One of the components of a cash flow statement is cash flow from investing activities. Included would be:",
        options: [
          "Payments to retire bonds and the payment of dividends",
          "Cash receipts (money coming in) from items such as interest and dividends",
          "Cash proceeds from issuing stocks or bonds",
          "Transactions and events involving the purchase and sale of land, buildings, and equipment"
        ],
        answer: 3,
        explain: "Investing activities cover the purchase and sale of long-term assets not held for resale — land, buildings, equipment, and similar assets. Option A describes financing activities (retiring debt, paying dividends). Option B describes operating activities — interest and dividends received are operating cash flows even though they come from investments. Option C is also a financing activity — proceeds from issuing securities represent how the company raises capital."
      },
      {
        q: "A company receives a dividend payment from a stock it holds as a long-term investment. On the cash flow statement, this receipt is classified under:",
        options: [
          "Investing activities, because it came from an investment",
          "Financing activities, because dividends are a financing concept",
          "Operating activities, as cash receipts from dividends are operating",
          "It is not reflected on the cash flow statement"
        ],
        answer: 2,
        explain: "Under U.S. GAAP, dividends and interest received are classified as operating activities — even when they come from long-term investments. This is a common exam trap: the source of the cash feels like investing, but the classification is operating. Options A and B are incorrect by definition; option D is wrong because all cash inflows and outflows appear somewhere on the statement."
      }
    ]
  },
  {
    id: "dividends-payable-balance-sheet",
    category: "Equities",
    title: "Dividends Payable on the Balance Sheet",
    color: "#7EC8A4",
    analogy: "Imagine a company is like a person who just promised to pay their landlord rent that's due next week. That promise is now a debt — it sits on the 'what I owe' side of the ledger, not the 'what I own' side. Dividends payable work the same way: once declared, the company owes that cash to shareholders, making it a short-term obligation.",
    rule: "Dividends payable are dividends that have been **declared but not yet paid**. They represent a legal obligation of the company and are classified as a **current liability** on the balance sheet — meaning they are due within one year. They are NOT equity (the obligation has left equity), and NOT an asset.",
    watch: "It's tempting to classify dividends payable under stockholders' equity because dividends relate to shareholders — but once declared, the funds are legally owed out and become a liability. Equity decreases when dividends are declared; current liabilities increase.",
    quiz: [
      {
        q: "On a balance sheet, dividends payable would fall under the category of:",
        options: [
          "Stockholders' equity",
          "Current liabilities",
          "Assets",
          "Fixed liabilities"
        ],
        answer: 1,
        explain: "Dividends payable are declared but unpaid dividends — a legal short-term obligation due within one year, making them a current liability. Option A is wrong because once declared, dividends reduce equity, not increase it. Option C is wrong directionally — this is money owed out, not owned. Option D (fixed/long-term liabilities) is wrong because dividends are always paid out quickly, well within one year."
      },
      {
        q: "When a company's board of directors declares a cash dividend, what is the immediate accounting effect on the balance sheet?",
        options: [
          "Assets increase; stockholders' equity increases",
          "Assets decrease; current liabilities decrease",
          "Stockholders' equity decreases; current liabilities increase",
          "No effect until the dividend is actually paid"
        ],
        answer: 2,
        explain: "At declaration, the company records a liability (dividends payable — current liabilities increase) and reduces retained earnings (a component of stockholders' equity decreases). Assets don't change until the cash is actually paid out. Option D is wrong — the declaration date, not the payment date, is when the balance sheet is affected."
      }
    ]
  },
  {
    id: "net-worth-components",
    category: "Equities",
    title: "Components of Net Worth (Stockholders' Equity)",
    color: "#7EC8A4",
    analogy: "Think of a balance sheet as a photograph taken on a single day — it shows everything a company owns (assets) and owes (liabilities), and the difference is net worth. An income statement is more like a video — it records what happened over time. Operating income is part of the video, not the photo. You can't find it in the snapshot of net worth.",
    rule: "Net worth (stockholders' equity) = **Assets − Liabilities**, as shown on the balance sheet. Components include tangible assets (inventory, fixed assets), intangible assets (goodwill, patents), and equity accounts (retained earnings, paid-in capital). **Operating income is an income statement item** — it is neither an asset nor a liability and therefore is NOT a component of net worth.",
    watch: "Watch for income statement items (operating income, net income, revenue, EPS) being offered as balance sheet components. They are fundamentally different financial statements measuring different things. Net income does *flow into* retained earnings eventually — but operating income itself is never a balance sheet line item.",
    quiz: [
      {
        q: "Components of a company's net worth would include all of these EXCEPT:",
        options: [
          "Goodwill",
          "Fixed assets",
          "Operating income",
          "Inventory"
        ],
        answer: 2,
        explain: "Net worth = assets minus liabilities, and every component must be a balance sheet item. Goodwill is an intangible asset, fixed assets are long-term assets, and inventory is a current asset — all on the balance sheet. Operating income is an income statement item measuring profitability over a period; it is neither an asset nor a liability and does not appear on the balance sheet."
      },
      {
        q: "Which of the following best describes the relationship between the income statement and the balance sheet?",
        options: [
          "They are the same document presented in different formats",
          "Net income from the income statement flows into retained earnings on the balance sheet",
          "Operating income is recorded as an asset on the balance sheet",
          "The balance sheet measures performance over time; the income statement measures a snapshot"
        ],
        answer: 1,
        explain: "The income statement and balance sheet are linked through retained earnings — net income (after dividends) accumulates in retained earnings on the balance sheet. Option A is wrong; they are separate statements. Option C is wrong; operating income never appears on the balance sheet. Option D reverses the descriptions — the balance sheet is the snapshot (point in time) and the income statement measures performance over a period."
      }
    ]
  },
  {
    id: "retained-earnings-calculation",
    category: "Equities",
    title: "Retained Earnings: Ending Balance Calculation",
    color: "#7EC8A4",
    analogy: "Retained earnings work like a company's savings account. You start the year with a balance, deposit the year's profits (net income), and withdraw whatever gets paid out to shareholders (dividends). Whatever remains in the account at year-end is the new retained earnings balance — carried forward to the next year.",
    rule: "**Ending Retained Earnings = Beginning Retained Earnings + Net Income − Dividends Paid.** Retained earnings represent accumulated profits kept in the business rather than distributed. They appear in the stockholders' equity section of the balance sheet and increase with profits, decrease with dividends or net losses.",
    watch: "Two common traps: (1) forgetting to subtract dividends and stopping at Beginning RE + Net Income, or (2) reporting only the current year's net income as if it were the full retained earnings balance. Always start with the beginning balance — retained earnings accumulate over the life of the company.",
    quiz: [
      {
        q: "A company begins the year with $7 million in retained earnings, earns $3 million in post-tax profits, and pays $1 million in dividends. What are the ending retained earnings?",
        options: [
          "$7 million",
          "$10 million",
          "$9 million",
          "$3 million"
        ],
        answer: 2,
        explain: "Ending RE = $7M + $3M − $1M = $9M. Option A ($7M) ignores net income entirely. Option B ($10M) adds net income but forgets to subtract the dividend. Option D ($3M) confuses the year's net income with the total retained earnings balance — a classic trap on calculation questions."
      },
      {
        q: "Which of the following would cause a company's retained earnings to decrease?",
        options: [
          "Issuing new shares of common stock",
          "Reporting a net loss for the year",
          "Increasing the par value of existing shares",
          "Receiving a loan from a bank"
        ],
        answer: 1,
        explain: "Retained earnings decrease when the company pays dividends or reports a net loss (since losses subtract from accumulated profits). Option A (issuing shares) increases paid-in capital, a separate equity account — not retained earnings. Option C (par value changes) is an accounting reclassification within equity, not a change to retained earnings. Option D (bank loan) affects liabilities and assets, not equity."
      }
    ]
  },
  {
    id: "cash-flow-increases",
    category: "Equities",
    title: "What Increases a Company's Cash Flow",
    color: "#7EC8A4",
    analogy: "Think of cash flow like the actual money in your wallet — not what you've earned, not what you're owed, but what you can physically spend right now. Borrowing money from a friend puts cash in your wallet immediately, even if you owe it back. Selling something on credit is like handing over your product and getting an IOU — your wallet doesn't get heavier until they actually pay. Cash flow is about what hits the account, not what's on paper.",
    rule: "Cash flow increases when **actual cash is received** — such as issuing debt (bonds) or equity, collecting receivables, or generating cash sales. Issuing a bond brings in immediate cash as a financing inflow. **Increasing inventory consumes cash** (purchasing goods). **Extending credit delays cash collection** — it records revenue but not yet cash. **Reducing sales reduces operating cash inflows.**",
    watch: "The biggest trap is confusing revenue/profit with cash. Extending credit to customers books a sale on the income statement but produces zero immediate cash — it creates accounts receivable instead. A company can be highly profitable on paper and still be cash-poor if most sales are on credit. Cash flow ≠ net income.",
    quiz: [
      {
        q: "Which of the following would have the effect of increasing a company's cash flow?",
        options: [
          "Issuance of a bond",
          "Increasing inventory",
          "Reducing sales",
          "Extending credit to good customers"
        ],
        answer: 0,
        explain: "Issuing a bond generates an immediate cash inflow (a financing activity) — the company receives cash from bondholders now, regardless of future repayment obligations. Increasing inventory (B) consumes cash to purchase goods. Reducing sales (C) lowers operating cash inflows. Extending credit (D) records revenue but delays actual cash collection — it creates accounts receivable, not immediate cash."
      },
      {
        q: "A company reports strong net income for the quarter but is experiencing a cash shortage. Which of the following could best explain this situation?",
        options: [
          "The company issued too many bonds during the quarter",
          "The company made most of its sales on credit, creating large accounts receivable",
          "The company reduced its inventory levels significantly",
          "The company collected more receivables than it generated in new sales"
        ],
        answer: 1,
        explain: "Cash flow and net income diverge when sales are made on credit. Revenue is recognized when earned (boosting net income), but cash only arrives when customers actually pay. Large accounts receivable means profits are on paper but cash hasn't been collected — a classic cause of cash shortages at profitable companies. Option A (issuing bonds) would increase cash, not reduce it. Option C (reducing inventory) frees up cash. Option D (collecting receivables) also increases cash."
      }
    ]
  },
  {
    id: "sec-form-8k",
    category: "Regulations",
    title: "SEC Form 8-K: Current Report for Material Events",
    color: "#FF6B6B",
    analogy: "Think of SEC filings like a company's communication schedule. The 10-K is the detailed annual letter sent to investors every year. The 10-Q is the shorter quarterly update. But the 8-K is the urgent text message — sent within 4 business days whenever something big and unexpected happens that investors need to know about right now, like selling a major subsidiary, replacing the CEO, or filing for bankruptcy.",
    rule: "**Form 8-K** is filed to disclose material corporate events within **4 business days** of occurrence. Triggering events include acquisitions or divestitures (like selling a subsidiary), executive changes, bankruptcy, and changes in auditors. **Form 10-K** = annual audited report. **Form 10-Q** = quarterly unaudited report (filed 3x/year). **Form 13F** = quarterly portfolio disclosure by institutional managers with ≥$100M AUM.",
    watch: "Don't confuse 8-K (material event disclosure) with 10-K (annual report) just because they sound similar. The '8' is the clue — think '8-K = Breaking news.' Also remember 13F is about large investors disclosing their holdings, not about corporate events at all.",
    quiz: [
      {
        q: "If a publicly traded corporation was going to sell a wholly owned subsidiary, the information would be made available through the filing of Form:",
        options: [
          "13F",
          "10-K",
          "8-K",
          "10-Q"
        ],
        answer: 2,
        explain: "The sale of a wholly owned subsidiary is a material corporate event requiring prompt disclosure via Form 8-K, which must be filed within 4 business days. Form 10-K (B) is the annual report and would eventually reference the event but is not the disclosure vehicle. Form 10-Q (D) is the quarterly report — same issue. Form 13F (A) is filed by large institutional investors to disclose their equity holdings and has nothing to do with corporate events."
      },
      {
        q: "Which of the following events would NOT typically trigger a Form 8-K filing?",
        options: [
          "The CEO resigns unexpectedly",
          "The company files for bankruptcy protection",
          "The company releases its routine quarterly earnings report",
          "The company acquires a major competitor"
        ],
        answer: 2,
        explain: "Routine quarterly earnings are disclosed via Form 10-Q — a scheduled filing, not a material event bulletin. The 8-K is reserved for unscheduled, material developments: executive departures (A), bankruptcy filings (B), and major acquisitions (D) all qualify as material events requiring prompt 8-K disclosure."
      },
      {
        q: "Form 13F is required to be filed by:",
        options: [
          "All publicly traded companies on a quarterly basis",
          "Institutional investment managers with at least $100 million in equity assets under management",
          "Any investor who acquires more than 5% of a company's outstanding shares",
          "Broker-dealers executing trades on behalf of foreign investors"
        ],
        answer: 1,
        explain: "Form 13F is a quarterly portfolio disclosure required of institutional investment managers with $100M or more in qualifying equity assets — think mutual funds, pension funds, and hedge funds. Option A confuses it with 10-Q. Option C describes Schedule 13D/13G (large ownership disclosures). Option D is unrelated to 13F."
      }
    ]
  },
  {
    id: "current-liabilities-balance-sheet",
    category: "Equities",
    title: "Current vs. Long-Term Liabilities on the Balance Sheet",
    color: "#7EC8A4",
    analogy: "Think of a company's balance sheet like a household budget divided into two timeframes. Current liabilities are the bills due this month — the credit card balance, the utility bill, the rent you owe. Long-term liabilities are the big multi-year debts — the mortgage, the car loan. Accounts payable is like an unpaid vendor invoice due in 30 days: clearly in the 'due soon' pile. A mortgage stretches over decades, so it lives in the long-term column.",
    rule: "**Current liabilities** are obligations due within **one year**: accounts payable, accrued expenses, dividends payable, and the current portion of long-term debt. **Long-term liabilities** are due beyond one year: mortgage payable, bonds payable, deferred taxes. Key distinctions: accounts **payable** = liability (cash going out); accounts **receivable** = asset (cash coming in). Prepaid expenses are current **assets**, not liabilities.",
    watch: "Mortgage payable is the classic trap — it sounds like a liability (it is), but it's long-term, not current. Also watch for the receivable/payable flip: receivables are always assets, payables are always liabilities. Prepaid rent is an asset (you've already paid for future value you'll receive), not a liability.",
    quiz: [
      {
        q: "Current liabilities on a company's balance sheet would include:",
        options: [
          "Accounts receivable",
          "Prepaid rent",
          "Accounts payable",
          "Mortgage payable"
        ],
        answer: 2,
        explain: "Accounts payable represents short-term obligations to vendors, typically due within 30-90 days — a textbook current liability. Accounts receivable (A) is a current asset (money owed TO the company). Prepaid rent (B) is also a current asset (future value already paid for). Mortgage payable (D) is a long-term liability — the repayment timeline extends well beyond one year."
      },
      {
        q: "Which of the following would be classified as a current asset on the balance sheet?",
        options: [
          "Accounts payable",
          "Prepaid insurance",
          "Mortgage payable",
          "Bonds payable"
        ],
        answer: 1,
        explain: "Prepaid insurance is a current asset — the company has paid cash in advance for future coverage, representing value it will receive within the next year. Accounts payable (A) is a current liability. Mortgage payable (C) and bonds payable (D) are long-term liabilities. The key: if the company paid ahead for something it will consume within a year, that's a prepaid current asset."
      },
      {
        q: "A company has a 20-year mortgage with $500,000 remaining. Of that, $20,000 is due within the next 12 months. How should this appear on the balance sheet?",
        options: [
          "$500,000 under long-term liabilities only",
          "$20,000 under current liabilities; $480,000 under long-term liabilities",
          "$500,000 under current liabilities only",
          "$20,000 under long-term liabilities; $480,000 under current liabilities"
        ],
        answer: 1,
        explain: "The current portion of long-term debt — the amount due within one year — is separated out and shown under current liabilities ($20,000). The remaining balance ($480,000) stays under long-term liabilities. This split gives users of the financial statements a clear picture of near-term cash obligations. Option A incorrectly lumps everything into long-term; Options C and D get the split backward."
      }
    ]
  },
  {
    id: "8k-board-resignation",
    category: "Regulations",
    title: "Form 8-K: Board Resignations and Leadership Changes",
    color: "#FF6B6B",
    analogy: "Imagine you're a shareholder in a company and you find out — weeks later — that two board members quit over a heated disagreement about the company's direction. You'd be furious that no one told you sooner. The 8-K requirement exists to prevent exactly that: whenever something material happens at the leadership level, the company has four business days to put it on the public record through the SEC.",
    rule: "A board director resignation — especially one citing a disagreement — is a **material event** requiring a **Form 8-K filed with the SEC within four business days**. Leadership changes (directors, executives), major transactions, bankruptcy, and auditor changes all trigger 8-K filings. The materiality test: would a reasonable investor consider this important to their investment decision?",
    watch: "Watch for wrong answers that swap in the wrong form (10-K), the wrong deadline (next business day), or the wrong regulator (FINRA). FINRA governs broker-dealers — it has no role in a public company's board disclosures. The SEC is always the correct regulator for public company reporting obligations.",
    quiz: [
      {
        q: "When a member of the board of directors of a publicly traded company resigns due to a disagreement over an operational matter:",
        options: [
          "Form 8-K must be filed with the SEC within four business days of the event",
          "Form 10-K must be filed with the SEC within four business days of the event",
          "The administrator must be notified no later than the close of the business day following the event",
          "FINRA must be notified promptly"
        ],
        answer: 0,
        explain: "A contentious board resignation is a material event requiring an 8-K filed with the SEC within four business days. Option B is wrong on the form — the 10-K is the scheduled annual report, not an event-triggered filing. Option C invents a next-business-day deadline that doesn't apply here. Option D is wrong on the regulator — FINRA oversees broker-dealers, not public company board governance; the SEC is the correct authority."
      },
      {
        q: "Which of the following best describes the SEC's materiality standard for determining whether a Form 8-K must be filed?",
        options: [
          "Any event that results in a change to the company's stock price",
          "Any event that the company's legal counsel deems significant",
          "Any event a reasonable investor would consider important in making an investment decision",
          "Any event that changes the company's annual earnings forecast"
        ],
        answer: 2,
        explain: "The SEC's materiality standard is whether a reasonable investor would consider the information important when making an investment decision. This is a broad, judgment-based standard — not tied to stock price movement (A), attorney opinion (B), or earnings forecasts specifically (D). It's why board disagreements, executive departures, and major transactions all qualify: they could all affect how a reasonable investor evaluates the company."
      }
    ]
  },
  {
    id: "depreciation-cash-flow-addback",
    category: "Equities",
    title: "Depreciation Add-Back: Indirect Method of Operating Cash Flow",
    color: "#7EC8A4",
    analogy: "Imagine you bought a delivery van for your business three years ago. Each year, you record a depreciation expense on your income statement — but you're not writing a check to anyone. The cash left when you bought the van. Depreciation quietly shrinks your reported profit without touching your bank account. So when analysts want to know how much cash the business actually generated, they start with net income and add depreciation right back — undoing that non-cash reduction.",
    rule: "**Cash Flow from Operations (indirect method) = Net Income + Depreciation + other non-cash charges.** Depreciation is a non-cash expense that reduces net income on the income statement without any actual cash outflow. Adding it back to net income converts accounting profit into operating cash flow. The original cash outflow for the asset appears in **investing activities** when the asset was purchased — not in operating cash flow.",
    watch: "Don't confuse where depreciation shows up at purchase vs. over time. Buying the asset = investing activity (cash out). Annual depreciation = non-cash operating expense that gets added back when computing operating cash flow. The exam may also test this in reverse: higher depreciation means lower net income but does NOT mean lower cash flow.",
    quiz: [
      {
        q: "When an analyst adds back the current year's depreciation to net income, she is computing the company's:",
        options: [
          "Cash flow from operations",
          "Cash flow from investments",
          "Earnings per share",
          "Net value of fixed assets"
        ],
        answer: 0,
        explain: "Adding depreciation back to net income is the first step in the indirect method of computing operating cash flow. Depreciation is a non-cash expense that reduces net income without any cash outflow, so it must be added back to arrive at actual cash generated from operations. Cash flow from investments (B) is where the original asset purchase appears. Earnings per share (C) uses net income as-is, divided by shares outstanding. Net value of fixed assets (D) is a balance sheet figure equal to cost minus accumulated depreciation."
      },
      {
        q: "A company reports net income of $500,000 and depreciation expense of $80,000 for the year. Using the indirect method, what is its approximate cash flow from operations (assuming no other adjustments)?",
        options: [
          "$420,000",
          "$500,000",
          "$580,000",
          "$80,000"
        ],
        answer: 2,
        explain: "Operating cash flow (indirect method) = Net Income + Depreciation = $500,000 + $80,000 = $580,000. Option A ($420,000) incorrectly subtracts depreciation — the opposite of the correct adjustment. Option B ($500,000) ignores the add-back entirely. Option D ($80,000) is just the depreciation figure alone. Since depreciation is non-cash, real cash generation exceeds reported net income."
      },
      {
        q: "A company purchases new equipment for $200,000. Over its useful life, the company depreciates the equipment at $20,000 per year. Where does each of these appear on the cash flow statement?",
        options: [
          "Both the purchase and annual depreciation appear in investing activities",
          "The purchase appears in financing activities; depreciation appears in operating activities",
          "The purchase appears in investing activities; annual depreciation is added back in operating activities",
          "Both appear in operating activities under the indirect method"
        ],
        answer: 2,
        explain: "The $200,000 cash purchase is an investing activity — acquiring a long-term asset. The annual $20,000 depreciation is a non-cash operating expense that gets added back to net income when computing operating cash flow under the indirect method. These are two separate events on the cash flow statement: the one-time cash outflow at purchase, and the ongoing non-cash accounting adjustment each year thereafter."
      }
    ]
  },
  {
    id: "owners-equity-components",
    category: "Equities",
    title: "Components of Owners' Equity on the Balance Sheet",
    color: "#7EC8A4",
    analogy: "Think of owners' equity like the 'net worth' section of a personal balance sheet. It includes what you put in (paid-in capital, like your initial investment), what you've accumulated over time (retained earnings, like your savings), and adjustments for shares bought back (treasury stock, like money you took back out). Net income is what you earned this year — but it doesn't sit in your net worth column directly. It flows into your savings account (retained earnings) first, and that's what shows up on the balance sheet.",
    rule: "The owners' equity section of a balance sheet includes: **paid-in capital** (common and preferred stock at par + additional paid-in capital), **retained earnings** (accumulated net income minus dividends), and **treasury stock** (repurchased shares, shown as a negative/contra-equity item). **Net income is an income statement item** — it does not appear directly in owners' equity. It flows into retained earnings at period end, and retained earnings is what appears on the balance sheet.",
    watch: "Net income is the most tempting wrong answer because it clearly affects equity — but it affects it *indirectly*, through retained earnings. The balance sheet shows retained earnings (the accumulated total), not net income (the current period's contribution). This is the same income statement vs. balance sheet distinction tested throughout this topic area.",
    quiz: [
      {
        q: "The owners' equity portion of a corporation's balance sheet would contain all of the following EXCEPT:",
        options: [
          "Paid-in capital",
          "Net income",
          "Treasury stock",
          "Preferred stock"
        ],
        answer: 1,
        explain: "Net income is an income statement item — it does not appear as a line item in the owners' equity section of the balance sheet. It flows into retained earnings at year-end, and retained earnings is the equity account that appears on the balance sheet. Paid-in capital (A), treasury stock (C), and preferred stock (D) are all direct components of owners' equity. Treasury stock is unique in that it reduces equity (shown as a negative), but it still lives in the equity section."
      },
      {
        q: "A company earned $2 million in net income this year and paid $500,000 in dividends. Which balance sheet account is most directly affected?",
        options: [
          "Paid-in capital",
          "Treasury stock",
          "Retained earnings",
          "Accounts payable"
        ],
        answer: 2,
        explain: "Net income flows into retained earnings, and dividends are subtracted from retained earnings — so this year's activity increases retained earnings by $1.5 million ($2M − $0.5M). Paid-in capital (A) only changes when new shares are issued. Treasury stock (B) changes when shares are repurchased. Accounts payable (D) is a current liability with no direct link to net income or dividends."
      },
      {
        q: "Treasury stock is best described as:",
        options: [
          "Stock issued by the U.S. Treasury Department",
          "Shares of the company's own stock that have been repurchased and are held by the company",
          "A type of preferred stock with guaranteed dividends",
          "New shares issued to raise additional paid-in capital"
        ],
        answer: 1,
        explain: "Treasury stock is a company's own shares that it has bought back from investors. It reduces total owners' equity and is shown as a negative (contra-equity) line item on the balance sheet. Option A is a common misconception — Treasury securities are government debt instruments, completely unrelated. Option C describes a feature of some preferred stock, not treasury stock. Option D describes a new issuance, which would increase paid-in capital, the opposite effect."
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
