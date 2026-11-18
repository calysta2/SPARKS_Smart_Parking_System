import { useState } from "react";

type Screen =
  | "home"
  | "availability"
  | "account"
  | "search"
  | "reserve"
  | "spot"
  | "reserveSelected"
  | "payment"
  | "pass"
  | "directions";

const A = "/assets";

function Icon({ src, alt = "" }: { src: string; alt?: string }) {
  return <img className="icon" src={`${A}/${src}`} alt={alt} />;
}

function Back({ onClick }: { onClick: () => void }) {
  return (
    <button className="round-button" onClick={onClick} aria-label="Go back">
      <Icon src="73a46.svg" />
    </button>
  );
}

function Header({
  title,
  onBack,
  close = false,
}: {
  title: string;
  onBack: () => void;
  close?: boolean;
}) {
  return (
    <header className="page-header">
      <button className="round-button" onClick={onBack} aria-label={close ? "Close" : "Go back"}>
        {close ? "×" : <Icon src="73a46.svg" />}
      </button>
      <strong>{title}</strong>
      <span className="header-balance" />
    </header>
  );
}

const navItems: { id: Screen; label: string; icon: string }[] = [
  { id: "home", label: "Home", icon: "33ff5.svg" },
  { id: "availability", label: "Availability", icon: "41339.svg" },
  { id: "reserve", label: "Bookings", icon: "d2fa8.svg" },
  { id: "account", label: "Account", icon: "a7f33.svg" },
];

function BottomNav({ current, go }: { current: Screen; go: (s: Screen) => void }) {
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={current === item.id ? "active" : ""}
          onClick={() => go(item.id)}
        >
          <Icon src={item.icon} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function ParkingCard({
  name,
  percent,
  left,
  onReserve,
}: {
  name: string;
  percent: number;
  left: number;
  onReserve: () => void;
}) {
  return (
    <article className="parking-card">
      <strong>{name}</strong>
      <div className="occupancy">
        <b>{percent}%</b>
        <span>full</span>
      </div>
      <div className="meter">
        <i style={{ width: `${percent}%` }} />
      </div>
      <div className="card-foot">
        <span>{left} left</span>
        <button onClick={onReserve}>Reserve</button>
      </div>
    </article>
  );
}

function Home({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="screen with-nav home">
      <main>
        <div className="brand-row">
          <span className="brand-mark">P</span>
          <b>SPARKS</b>
          <button className="round-button bell" aria-label="Notifications">
            ♧
          </button>
        </div>
        <h1>
          Less circling.
          <br />
          More living.
        </h1>
        <p className="sub">One flat rate. Rp 15.000 per reservation.</p>
        <button className="search-box" onClick={() => go("search")}>
          <span>⌕</span>
          <span>Where are you headed?</span>
          <b>☷</b>
        </button>

        <div className="section-heading">
          <h2>Parking near you</h2>
          <button onClick={() => go("availability")}>See all</button>
        </div>
        <div className="parking-grid">
          <ParkingCard name="BINUS @BSD" percent={28} left={108} onReserve={() => go("search")} />
          <ParkingCard name="AEON Mall BSD" percent={31} left={83} onReserve={() => go("search")} />
        </div>

        <button className="reserve-again" onClick={() => go("reserve")}>
          <span className="brand-mark">P</span>
          <span>
            <small>Reserve again</small>
            <b>AEON Mall BSD</b>
          </span>
          <em>Reserve</em>
        </button>

        <div className="section-heading bookings-title">
          <h2>Bookings Coming Up!</h2>
          <button onClick={() => go("reserve")}>›</button>
        </div>
        <button className="booking-banner" onClick={() => go("pass")}>
          <span>
            <small>NEXT RESERVATION · IN 35 MIN</small>
            <b>BINUS @BSD · Spot C3</b>
            <em>Today, 10:00 AM – 12:00 PM</em>
          </span>
          <strong>Show pass</strong>
        </button>

        <h2 className="skip-title">Skip The Crowds</h2>
        <button className="pulse-card" onClick={() => go("availability")}>
          <span>
            <small>PARKING PULSE</small>
            <b>Best time to park today</b>
            <em>4–5 PM · usually under 40% full</em>
          </span>
          <i className="pulse-bars">
            {[8, 14, 23, 32, 40, 46, 38, 31, 24, 17, 11, 7].map((h, i) => (
              <b key={i} style={{ height: h }} />
            ))}
          </i>
          <strong>›</strong>
        </button>
      </main>
      <BottomNav current="home" go={go} />
    </div>
  );
}

function Availability({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="screen with-nav">
      <main>
        <div className="center-title">Parking availability</div>
        <h1 className="page-title">Spots left. At a glance.</h1>
        <button className="location-row">
          <Icon src="6e3b7.svg" />
          <b>BINUS @BSD</b>
          <span>Change</span>
        </button>
        <section className="availability-total">
          <b>74</b>
          <div>
            <strong>spots available</strong>
            <span>Across 3 nearby parking lots</span>
          </div>
          <small>Available now · Not yet reserved</small>
          <em>● Live now</em>
        </section>
        <h2 className="lots-title">Spots left by parking lot</h2>
        <p className="sub">Choose a lot to view details and reserve.</p>
        <div className="availability-list">
          <ParkingCard name="BINUS @BSD" percent={28} left={108} onReserve={() => go("search")} />
          <ParkingCard name="The Breeze" percent={5} left={167} onReserve={() => go("search")} />
          <ParkingCard name="AEON Mall BSD" percent={31} left={83} onReserve={() => go("search")} />
        </div>
      </main>
      <BottomNav current="availability" go={go} />
    </div>
  );
}

function Toggle({ on = false }: { on?: boolean }) {
  return (
    <span className={`toggle ${on ? "on" : ""}`}>
      <i />
    </span>
  );
}

function Account({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="screen with-nav">
      <main>
        <h1 className="account-title">Account</h1>
        <section className="profile-card">
          <span>D</span>
          <div>
            <b>Danica</b>
            <small>+62 8xx xxxx xxxx</small>
          </div>
          <button>Edit</button>
        </section>
        <h3>My Vehicles</h3>
        <div className="vehicle-grid">
          <article>
            <span>Car · default</span>
            <b>B 1109 DAY</b>
          </article>
          <button>+ Add vehicle</button>
        </div>
        <h3>Parking preferences</h3>
        <div className="setting">
          <span>
            <b>Reminder before time is up</b>
            <small>Get a nudge 15 minutes before</small>
          </span>
          <Toggle on />
        </div>
        <div className="setting">
          <span>
            <b>EV charging only</b>
            <small>Only show lots with chargers</small>
          </span>
          <Toggle />
        </div>
        <h3>More</h3>
        {[
          ["Payment Method", "QRIS"],
          ["Saved Places", "BINUS @BSD, The Breeze"],
          ["Help & Support", ""],
        ].map(([a, b]) => (
          <button className="more-row" key={a}>
            <span>
              <b>{a}</b>
              <small>{b}</small>
            </span>
            <strong>›</strong>
          </button>
        ))}
      </main>
      <BottomNav current="account" go={go} />
    </div>
  );
}

const lots = [
  ["BINUS @BSD", "4 min walk", "8 / 80 left", "Covered · EV"],
  ["The Breeze", "2 mins ride", "24 / 120 left", "Covered"],
  ["AEON Mall BSD", "5 mins ride", "35 / 150 left", "24/7 · EV"],
  ["Living World", "20 mins ride", "24 / 120 left", "Covered"],
];

function Search({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="screen action-screen">
      <main>
        <Header title="Plan your parking" onBack={() => go("home")} />
        <h1 className="page-title">Where are you going?</h1>
        <button className="destination">
          <Icon src="6e3b7.svg" />
          <span>
            <small>DESTINATION</small>
            <b>BINUS @BSD</b>
          </span>
          <strong>Change</strong>
        </button>
        <section className="date-time">
          <div>
            <Icon src="30308.svg" />
            <b>Today, Nov 3</b>
            <span>2-hour stay</span>
          </div>
          <div>
            <span>
              <small>ARRIVE</small>
              <b>10:00 AM</b>
            </span>
            <i />
            <span>
              <small>LEAVE</small>
              <b>12:00 PM</b>
            </span>
          </div>
        </section>
        <div className="section-heading nearby">
          <span>
            <h2>Nearby parking</h2>
            <small>3 lots · Rp 15.000 flat per reservation</small>
          </span>
          <em>● Live</em>
        </div>
        <div className="lot-list">
          {lots.map((lot, i) => (
            <button className={`lot-row ${i === 0 ? "selected" : ""}`} key={lot[0]}>
              <span className="lot-p">P</span>
              <span>
                <b>{lot[0]}</b>
                <small>{lot[1]}</small>
                <em>● &nbsp;{lot[2]}</em>
              </span>
              <span className="lot-price">
                <b>Rp 15.000</b>
                <small>flat rate</small>
                <em>{lot[3]}</em>
              </span>
              <strong>{i === 0 ? "●" : "›"}</strong>
            </button>
          ))}
        </div>
      </main>
      <ActionBar onClick={() => go("reserve")}>
        Continue · BINUS @BSD <b>→</b>
      </ActionBar>
    </div>
  );
}

function ActionBar({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <footer className="action-bar">
      <button onClick={onClick}>{children}</button>
    </footer>
  );
}

function Reserve({ go, selected = false }: { go: (s: Screen) => void; selected?: boolean }) {
  return (
    <div className="screen action-screen">
      <main>
        <Header title="Reserve parking" onBack={() => go(selected ? "spot" : "search")} />
        <h1 className="page-title place-title">BINUS BSD</h1>
        <p className="sub location-sub">⌾ &nbsp;BSD City · 10 car spaces</p>
        <section className="spaces-card">
          <small>ROOM FOR YOU</small>
          <em>● Live</em>
          <div>
            <b>03</b>
            <strong>/ 10 car spaces left</strong>
          </div>
          <i>
            {Array.from({ length: 20 }, (_, i) => (
              <span className={i < 4 ? "free" : ""} key={i} />
            ))}
          </i>
        </section>
        <div className="features">
          <span>ϟ &nbsp;EV ready</span>
          <span>◇ &nbsp;24/7 security</span>
        </div>
        <h2>Choose your stay</h2>
        <button className="date-row">
          <Icon src="30308.svg" />
          <span>
            <small>DATE</small>
            <b>Today, Nov 3</b>
          </span>
          <strong>›</strong>
        </button>
        <div className="times">
          <button>
            <small>ARRIVAL</small>
            <b>{selected ? "" : "10:00 AM"}</b>
            <span>⌄</span>
          </button>
          <button>
            <small>DEPARTURE</small>
            <b>12:00 PM</b>
            <span>⌄</span>
          </button>
        </div>
        <button className="spot-pick" onClick={() => go("spot")}>
          <Icon src="ef64a.svg" />
          <b>{selected ? "Slot 03" : "Pick your spot"}</b>
          <span>›</span>
        </button>
        <h2 className="price-title">Price details</h2>
        <div className="price-line">
          <span>Flat reservation rate</span>
          <b>Rp 15.000</b>
        </div>
        <div className="total-line">
          <b>Total</b>
          <strong>Rp 15.000</strong>
        </div>
      </main>
      <ActionBar onClick={() => go("payment")}>
        Reserve &amp; pay with QRIS <b>→</b>
      </ActionBar>
    </div>
  );
}

function ParkingLayout({ route = false }: { route?: boolean }) {
  return (
    <section className="parking-layout">
      <div className="layout-label">
        <span>Illustrative parking layout</span>
        <b>CAR</b>
      </div>
      <div className="spot-row">
        {[1, 2, 3, 4, 5].map((n) => (
          <Spot key={n} n={n} selected={n === 3} available={n === 5} />
        ))}
      </div>
      <div className={`drive ${route ? "route" : ""}`}>
        {route && (
          <>
            <span>Gate 1</span>
            <i />
          </>
        )}
        <b>→</b>
      </div>
      <div className="spot-row">
        {[6, 7, 8, 9, 10].map((n) => (
          <Spot key={n} n={n} available={n === 8} />
        ))}
      </div>
      <div className="layout-foot">
        <b>↪ &nbsp;Gate 1 · Entry</b>
        <span>Drive aisle</span>
      </div>
    </section>
  );
}

function Spot({ n, selected, available }: { n: number; selected?: boolean; available?: boolean }) {
  return (
    <button
      className={`parking-spot ${selected ? "selected" : ""} ${available ? "available" : ""}`}
    >
      <b>{String(n).padStart(2, "0")}</b>
      {selected ? <span>✓</span> : <Icon src={available ? "3b531.svg" : "94407.svg"} />}
    </button>
  );
}

function SpotPicker({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="screen action-screen">
      <main>
        <Header title="Pick your spot" onBack={() => go("reserve")} />
        <h1 className="page-title place-title">BINUS BSD</h1>
        <p className="sub location-sub">⌾ &nbsp;BSD City · 10 car spaces</p>
        <div className="compact-date">
          <Icon src="c4247.svg" />
          <span>
            <b>Today, Nov 3</b>
            <small>10:00 AM – 12:00 PM</small>
          </span>
          <strong>3 / 10 left</strong>
        </div>
        <h2>Choose a car space</h2>
        <p className="sub">7 occupied · Select one of the 3 spaces left.</p>
        <div className="legend">
          <span>□ Available</span>
          <span>▣ Occupied</span>
          <span>▣ Selected</span>
        </div>
        <ParkingLayout />
        <section className="selected-summary">
          <b>03</b>
          <span>
            <strong>Your selected spot</strong>
            <small>Car parking</small>
          </span>
          <em>Rp 15.000</em>
          <p>Spot is reserved once your QRIS payment is complete.</p>
        </section>
        <p className="confirm-note">Confirm to return to your reservation.</p>
      </main>
      <ActionBar onClick={() => go("reserveSelected")}>Confirm spot 03 &nbsp; →</ActionBar>
    </div>
  );
}

function Payment({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="screen action-screen">
      <main>
        <Header title="Complete payment" onBack={() => go("spot")} />
        <h1 className="page-title">Pay with QRIS</h1>
        <p className="sub">One flat rate for your reservation.</p>
        <section className="payment-total">
          <span>
            <small>TOTAL PAYMENT</small>
            <b>Rp 15.000</b>
          </span>
          <em>Flat rate</em>
        </section>
        <section className="qris-card">
          <div>
            <b>QRIS</b>
            <strong>SPARKS</strong>
          </div>
          <p>Central Square · PK–28491</p>
          <Icon src="17655.svg" alt="Demo QR code, not valid for payment" />
          <small>Demo QR · Not valid for payment</small>
          <button>
            <Icon src="76f88.svg" /> Save QR
          </button>
        </section>
        <div className="awaiting">
          <Icon src="cc062.svg" />
          <b>Awaiting payment</b>
        </div>
        <ol className="steps">
          <li>Scan or upload this QR in your banking app.</li>
          <li>Pay Rp 15.000, then check payment status.</li>
        </ol>
        <p className="issue-note">Your entry pass is issued after payment is confirmed.</p>
      </main>
      <ActionBar onClick={() => go("pass")}>Check payment status</ActionBar>
    </div>
  );
}

function Pass({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="screen action-screen pass">
      <main>
        <Header title="Your parking pass" close onBack={() => go("home")} />
        <div className="success">✓</div>
        <h1>You’re all set.</h1>
        <p className="sub">Scan this pass at the entry gate.</p>
        <section className="ticket">
          <div className="ticket-top">
            <span>
              <b>BINUS BSD</b>
              <small>BSD City · Car parking</small>
            </span>
            <em>Confirmed</em>
          </div>
          <Icon src="a7ebe.svg" alt="QR reservation PK28491" />
          <strong>No. 3</strong>
          <small>PARKING SPOT NUMBER</small>
          <div className="ticket-time">
            <span>
              <small>TUE, NOV 3</small>
              <b>10:00 AM – 12:00 PM</b>
            </span>
            <span>
              <small>DURATION</small>
              <b>2 hours</b>
            </span>
          </div>
        </section>
        <div className="paid-row">
          <b>◇ &nbsp; Paid with QRIS</b>
          <strong>Rp 15.000</strong>
          <small>Entry via Gate 1 · Keep this pass handy</small>
        </div>
      </main>
      <footer className="pass-actions">
        <button onClick={() => go("directions")}>⌁ &nbsp; Get directions</button>
        <button>⇩</button>
      </footer>
    </div>
  );
}

function Directions({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="screen action-screen">
      <main>
        <Header title="Directions to your spot" onBack={() => go("pass")} />
        <h1 className="page-title place-title">BINUS BSD</h1>
        <p className="sub location-sub">⌾ &nbsp; Gate 1 → Your booked spot 03</p>
        <section className="direction-booking">
          <span>
            <small>SPOT</small>
            <b>03</b>
          </span>
          <i />
          <span>
            <strong>Today, Nov 3</strong>
            <em>10:00 AM – 12:00 PM</em>
            <small>◉ Paid with QRIS · Rp 15.000</small>
          </span>
        </section>
        <ParkingLayout route />
        <h2 className="from-title">From the entry gate</h2>
        <div className="instructions">
          {[
            ["e3e1e.svg", "Enter through Gate 1", "Scan your parking pass at the entry gate."],
            ["5dc1f.svg", "Continue along the drive aisle", "Pass spaces 01 and 02 on your left."],
            ["363b2.svg", "Turn left into spot 03", "Your reserved space is marked on the map."],
          ].map((x) => (
            <div key={x[1]}>
              <span>
                <Icon src={x[0]} />
              </span>
              <p>
                <b>{x[1]}</b>
                <small>{x[2]}</small>
              </p>
            </div>
          ))}
        </div>
        <p className="route-note">Illustrative route · Follow campus signs and staff guidance.</p>
      </main>
      <ActionBar onClick={() => go("home")}>Done</ActionBar>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const go = (next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (screen === "home") return <Home go={go} />;
  if (screen === "availability") return <Availability go={go} />;
  if (screen === "account") return <Account go={go} />;
  if (screen === "search") return <Search go={go} />;
  if (screen === "reserve") return <Reserve go={go} />;
  if (screen === "spot") return <SpotPicker go={go} />;
  if (screen === "reserveSelected") return <Reserve go={go} selected />;
  if (screen === "payment") return <Payment go={go} />;
  if (screen === "pass") return <Pass go={go} />;
  return <Directions go={go} />;
}
