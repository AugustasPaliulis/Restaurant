import Link from "next/link";
import styles from "./Contacts.module.scss";
const ContactsPage = () => {
  const contacts = [
    {
      title: "Reservations",
      email: "johndoe@example.com",
      phone: "123-456-7890",
    },
    {
      title: "General manager",
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "987-654-3210",
    },
    {
      title: "Marketing & Events Coordinator",
      name: "Bob Johnson",
      email: "emily.marketing@example.com",
      phone: "555-555-5555",
    },
    {
      title: "Customer Service",
      email: "customerservice@example.com",
      phone: "555-555-5555",
    },
  ];

  return (
    <div className={styles.contactsContainer}>
      <div className={styles.header}>
        <div className={styles.textContainer}>
          <h1>Our contacts</h1>
          <div className={styles.navigation}>
            <Link href="/">Home </Link>
            &gt;
            <Link href=""> Contacts</Link>
          </div>
        </div>
      </div>

      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            <h2>{contact.title}</h2>
            {contact.name && <p>Name: {contact.name}</p>}
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsPage;
