"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./History.module.scss";
import Cross from "@/icons/cross";
const OrderHistory = ({ order, totalPrice }) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    if (showModal) {
      console.log("SHOW");
    }
  }, [showModal]);
  const modalToggle = () => {
    setShowModal(!showModal);
  };

  // Disabling scrolling when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean-up function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  // Handling click outside of modal for closing it
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const modal = ({ name, line1, line2, postal_code, city, phoneNumber }) => {
    return (
      <div className={styles.modal}>
        <div ref={modalRef} className={styles.modalContent}>
          <div className={styles.orderedItems}>
            <h3>Ordered items</h3>
            <div className={styles.items}>
              {order.items.map((item, index) => {
                return (
                  <div key={index}>
                    {item.mealName}x{item.quantity} {item.price}
                  </div>
                );
              })}
            </div>
            <div className={styles.total}>
              <div>
                <h3>Total:</h3>
                <p>{totalPrice}</p>
                {order.paymentIntent && (
                  <p>
                    <i>Paid online</i>
                  </p>
                )}
              </div>
              {order.date && new Date(order.date.toDate()).toLocaleDateString()}
            </div>
          </div>
          <div className={styles.customerInfo}>
            <h3>Customer info</h3>
            <ul>
              <li>
                <p>Name:</p>
                {name}
              </li>
              <li>
                <p>Phone number:</p>
                {phoneNumber}
              </li>
              {order.customerInfo.restaurant && (
                <li>
                  <p>Restaurant:</p>
                  {order.customerInfo.restaurant}
                </li>
              )}
              {line1 && (
                <li>
                  <p>Address first:</p>
                  {line1}
                </li>
              )}
              {line2 && (
                <li>
                  <p>Address second:</p>
                  {line2}
                </li>
              )}
              {postal_code && (
                <li>
                  <p>Zip code:</p>
                  {postal_code}
                </li>
              )}
              <li>
                <p>City:</p>
                {city}
              </li>
            </ul>
          </div>
          <div className={styles.closeButton}>
            <Cross
              width={17}
              height={17}
              stroke={"black"}
              onClick={modalToggle}
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div onClick={modalToggle} className={styles.order}>
        <p>Ordered items: </p>
        <div className={styles.itemsContainer}>
          {order.items.map((item, index) => {
            return (
              <div key={index}>
                {item.mealName}x{item.quantity} {item.price}
              </div>
            );
          })}
        </div>
        <div className={styles.divider} />
        <p>Total price: {totalPrice}</p>
        <p>
          {order.date && new Date(order.date.toDate()).toLocaleDateString()}
        </p>
      </div>
      {showModal && <>{modal(order.customerInfo)}</>}
    </>
  );
};

export default OrderHistory;
