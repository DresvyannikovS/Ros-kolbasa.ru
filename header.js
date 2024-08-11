import { showModal } from "./modal.js";

const authImage = `
<a data-select=0 id="showAuthForm" href="#">
            <svg class="header__personalIcon"
              width="21.875000"
              height="25.000000"
              viewBox="0 0 21.875 25"
              fill="CurrentColor"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <defs />
              <path
                id="Vector"
                d="M17.18 6.25C17.18 9.7 14.38 12.5 10.93 12.5C7.48 12.5 4.68 9.7 4.68 6.25C4.68 2.79 7.48 0 10.93 0C14.38 0 17.18 2.79 17.18 6.25ZM15.8 4.23Q16.18 5.16 16.18 6.25Q16.18 7.33 15.8 8.26Q15.41 9.19 14.65 9.96Q13.88 10.73 12.95 11.11Q12.02 11.5 10.93 11.5Q9.84 11.5 8.92 11.11Q7.99 10.73 7.22 9.96Q6.45 9.19 6.07 8.26Q5.68 7.33 5.68 6.25Q5.68 5.16 6.07 4.23Q6.45 3.3 7.22 2.53Q7.99 1.76 8.92 1.38Q9.84 1 10.93 1Q12.02 1 12.95 1.38Q13.88 1.76 14.65 2.53Q15.41 3.3 15.8 4.23ZM14.49 14.06L15.31 14.06C18.93 14.06 21.87 17 21.87 20.62L21.87 22.65C21.87 23.95 20.82 25 19.53 25L2.34 25C1.04 25 0 23.95 0 22.65L0 20.62C0 17 2.93 14.06 6.56 14.06L7.37 14.06C8.46 14.56 9.66 14.84 10.93 14.84C12.2 14.84 13.41 14.56 14.49 14.06ZM14.71 15.06Q13.79 15.45 12.84 15.65Q11.91 15.84 10.93 15.84Q10.04 15.84 9.19 15.68Q8.15 15.48 7.16 15.06L6.56 15.06Q5.41 15.06 4.43 15.46Q3.44 15.87 2.62 16.69Q1.81 17.5 1.4 18.49Q1 19.47 1 20.62L1 22.65Q1 23.32 1.33 23.66Q1.67 24 2.34 24L19.53 24Q20.2 24 20.53 23.66Q20.87 23.32 20.87 22.65L20.87 20.62Q20.87 19.47 20.46 18.49Q20.06 17.5 19.24 16.69Q18.42 15.87 17.44 15.46Q16.46 15.06 15.31 15.06L14.71 15.06Z"
                fill="CurrentColor"
                fill-opacity="1.000000"
                fill-rule="evenodd"
              />
            </svg>
          </a>
`;

const logoutImage = `
<a data-select=1 id="showAuthForm" href="#">
<?xml version="1.0" encoding="iso-8859-1"?>

<svg class="header__personalIcon" fill="CurrentColor" height="23px" width="23px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 512 512" xml:space="preserve">
<g>
	<g>
		<path d="M301.697,491.922H90.785c-11.025,0-21.029-9.649-21.029-20.669V39.39c0-11.02,10.005-19.311,21.029-19.311h210.912
			c5.544,0,10.039-4.49,10.039-10.039C311.736,4.49,307.24,0,301.697,0H90.785C68.692,0,49.677,17.292,49.677,39.39v431.863
			C49.677,493.35,68.692,512,90.785,512h210.912c5.544,0,10.039-4.49,10.039-10.039S307.24,491.922,301.697,491.922z"/>
	</g>
</g>
<g>
	<g>
		<path d="M459.745,243.586l-90.353-100.392c-3.711-4.127-10.059-4.451-14.176-0.745c-4.123,3.706-4.456,10.4-0.745,14.517
			l75.272,83.976H201.304c-5.544,0-10.039,4.49-10.039,10.039c0,5.549,4.495,10.039,10.039,10.039h226.745l-73.216,72.877
			c-3.922,3.922-3.922,10.103,0,14.025c1.961,1.961,4.529,2.858,7.098,2.858c2.569,0,5.137-1.022,7.098-2.983l90.353-90.375
			C463.157,253.647,463.319,247.556,459.745,243.586z"/>
	</g>
</g>
</svg>
</a>
`;

export const renderPersonalButton = ({ token }) => {
  const containerEl = document.getElementById("personal-container");

  token === ""
    ? (containerEl.innerHTML = authImage)
    : (containerEl.innerHTML = logoutImage);
};

export const initialHeaderRender = ({ onShowModal }) => {
  const callAuthFormEl = document.getElementById("showAuthForm");

  callAuthFormEl.addEventListener("click", () => {
    showModal();

    onShowModal();
  });
};
