"use client";
import { useRef, useState } from "react";
import Image from "next/image";

import classes from "./image-picker.module.css";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const inputRef = useRef(null);
  function handlePickClick() {
    inputRef.current.click();
  }

  function handleImagePicked(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label className={classes.label} htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && (
            <div className={classes.placeholder}>
              <p>No image selected</p>
            </div>
          )}
          {pickedImage && <Image src={pickedImage} alt="Picked image" fill className={classes.image} />}
        </div>
        <div className={classes.uploadArea}>
          <input
            type="file"
            className={classes.input}
            id={name}
            accept="image/png, image/jpeg"
            name={name}
            ref={inputRef}
            onChange={handleImagePicked}
            required
          />
          <button
            className={classes.button}
            type="button"
            onClick={handlePickClick}
          >
            Choose an image
          </button>
        </div>
      </div>
    </div>
  );
}
