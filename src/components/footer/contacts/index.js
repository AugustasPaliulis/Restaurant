import Link from "next/link";
import styles from "./ContactsInfo.module.scss";
const cities = [
  {
    name: "Amsterdam",
    address1: "Prinsengracht 263, 1016 GV Amsterdam, Netherlands",
    address2: "Keizersgracht 672, 1017 ET Amsterdam, Netherlands",
    address3: "Singel 428, 1017 AZ Amsterdam, Netherlands",
    phone: "555-555-5555",
    email: "customerservice@example.com",
    hours: "Mon - Fri / 9:00 AM - 11:00 PM, Sat - Sun / 10:00 AM - 11:00 PM",
  },
  {
    name: "Rotterdam",
    address1: "Coolsingel 83, 3012 AE Rotterdam, Netherlands",
    address2: "Blaak 34, 3011 TA Rotterdam, Netherlands",
    address3: "Westersingel 77, 3015 LB Rotterdam, Netherlands",
    phone: "555-555-5556",
    email: "rotterdam@example.com",
    hours: "Mon - Fri / 9:00 AM - 11:00 PM, Sat - Sun / 10:00 AM - 11:00 PM",
  },
  {
    name: "The Hague",
    address1: "Lange Voorhout 15, 2514 EA Den Haag, Netherlands",
    address2: "Plein 24, 2511 CS Den Haag, Netherlands",
    address3: "Alexanderstraat 2, 2514 JL Den Haag, Netherlands",
    phone: "555-555-5557",
    email: "thehague@example.com",
    hours: "Mon - Fri / 9:00 AM - 11:00 PM, Sat - Sun / 10:00 AM - 11:00 PM",
  },
];

function ContactInfo() {
  return (
    <>
      <h1 className={styles.contactsTitle}>Our restaurants</h1>
      <ul className={styles.contactInfo}>
        {cities.map((city, index) => (
          <li key={index} className={styles.cityContacts}>
            <h1>{city.name} restaurants</h1>
            <p>{city.address1}</p>
            <p>{city.address2}</p>
            <p>{city.address3}</p>
            <p>{city.phone}</p>
            <Link href={`mailto:${city.email}`}>{city.email}</Link>
            <p>{city.hours}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ContactInfo;
