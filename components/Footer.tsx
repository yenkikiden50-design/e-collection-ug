import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

// Coffee Esiimwe — Footer / "Say Hello" contact section
// Colors matched to Product.tsx design system:
// #1A1A1A (near-black), #F5F3EF (cream bg), #C4562A (terracotta accent),
// #717171 (muted grey), #DDD9D3 (hairline), #fff, Playfair Display serif.

const Mail = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
    <path d="M3.5 6.5 12 13l8.5-6.5" />
  </svg>
);

const Phone = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6.5 3.5h3l1.5 4.5-2.2 1.8a12 12 0 0 0 5.4 5.4l1.8-2.2 4.5 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
  </svg>
);

const Pin = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const Logo = () => (
  <div style={{ lineHeight: 1.05 }}>
    <div
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontStyle: "italic",
        fontSize: "18px",
        color: "#1A1A1A",
        whiteSpace: "nowrap",
      }}
    >
      E-Collections.ug
    </div>
    <div
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "12px",
        letterSpacing: "0.22em",
        color: "#C4562A",
        marginTop: "2px",
      }}
    >
      EST. MMXXVI
    </div>
  </div>
);

const CallButton: React.FC<{ number: string }> = ({ number }) => (
  <a
    href={`tel:${number.replace(/\s+/g, "")}`}
    aria-label="Call now"
    title="Call now"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "38px",
      height: "38px",
      padding: 0,
      borderRadius: "50%",
      background: "#C4562A",
      color: "#fff",
      textDecoration: "none",
      marginBottom: 0,
    }}
  >
    <FontAwesomeIcon icon={faPhone} style={{ color: "#fff" }} width={16} height={16} />
  </a>
);

interface ContactRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isFirst?: boolean;
}

const ContactRow: React.FC<ContactRowProps> = ({ icon, label, value, isFirst }) => (
    <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "8px 0",
      borderTop: isFirst ? "1px solid #DDD9D3" : "none",
      borderBottom: "1px solid #DDD9D3",
    }}
  >
    <div style={{ color: "#C4562A", flexShrink: 0 }}>{icon}</div>
    <div style={{ minWidth: 0 }}>
      <div
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "10px",
          letterSpacing: "0.16em",
          color: "#717171",
          textTransform: "uppercase",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "13px",
          fontWeight: 600,
          color: "#1A1A1A",
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </div>
    </div>
  </div>
);

const Footer: React.FC = () => {
  return (
    // Outer wrapper just centers + pads the card on the page background
    <div
      style={{
        width: "100%",
        maxWidth: 420,
        margin: "0 auto",
        background: "transparent",
        borderTop: "1px solid #DDD9D3",
        display: "flex",
        justifyContent: "center",
        padding: "2px 8px 8px",
        boxSizing: "border-box",
        fontFamily: "'Playfair Display', Georgia, serif",
      }}
    >
      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "none",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow:
            "0 1px 2px rgba(26,26,26,0.06), 0 12px 32px rgba(26,26,26,0.14)",
          border: "1px solid #DDD9D3",
        }}
      >
        {/* Top bar */}
        <header
          style={{
            background: "#F5F3EF",
            borderBottom: "1px solid #DDD9D3",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo />
          <CallButton number="+256751792211" />
          {/* <button
            style={{
              background: "transparent",
              border: "1px solid #4A4A4A",
              color: "#fff",
              borderRadius: "999px",
              padding: "7px 16px",
              fontSize: "14px",
              fontFamily: "inherit",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Shop Now
          </button> */}
        </header>

        {/* Cream contact section */}
        <section
          style={{
            background: "#fff",
            padding: "14px 14px 12px",
          }}
        >
          <div
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: "#C4562A",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: "6px",
            }}
          >
            Say Hello
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "19px",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#1A1A1A",
              margin: "0 0 5px",
              maxWidth: "280px",
            }}
          >
            We'd love to know your thoughts.
          </h2>

          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontSize: "13px",
              color: "#717171",
              margin: "0 0 10px",
              maxWidth: "270px",
            }}
          >
            Share your vision with us.
          </p>

          <ContactRow icon={<Mail />} label="Email" value="Popeevaristoamanya@icloud.com" isFirst />
          <ContactRow
            icon={<FontAwesomeIcon icon={faPhone} style={{ color: "rgb(246, 122, 65)" }} width={19} height={19} />}
            label="Phone / WhatsApp"
            value="+256 751 792211/0785921646"
          />
          <ContactRow icon={<Pin />} label="Studio" value="Online Shop | Kampala, Uganda" />
        </section>

        {/* Bottom dark bar */}
        <footer
          style={{
            background: "#1A1A1A",
            padding: "10px 14px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "10px",
              letterSpacing: "0.03em",
              color: "#9A9A9A",
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()} All rights reserved. Copyright reserved for E-Collections.ug.com
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
