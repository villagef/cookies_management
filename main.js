class CookiesAlert {
  constructor() {
    this.vendors = new Object();
    this.vendorsAccept = new Array();
    this.API = "https://optad360.mgr.consensu.org/cmp/v2/vendor-list.json";

    this.vendorsContainer = document.querySelector(
      ".cookie__content--vendors ul"
    );
    this.checkboxes = Array.from(
      document.querySelectorAll(`input[name="check"]:checked`)
    );
    this.acceptBtn = document.querySelector("#accept");
    this.rejectBtn = document.querySelector("#reject");
  }

  // create list of vendors
  async manageCookies() {
    this.pullVendors();

    this.acceptBtn.addEventListener("click", () => {
      this.handleCheck();
      this.handleAcceptBtn();
    });

    this.rejectBtn.addEventListener("click", () => {
      this.handleRejectBtn();
    });
  }

  //get all vendors from API and assign to array
  async pullVendors() {
    const vendors = await this.fetchData(this.API);

    this.vendors = Object.values(vendors);

    this.createList(this.vendors);
  }

  // handle fetching data from API
  async fetchData(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data.vendors;
  }

  // create list of vendors
  createList(elements) {
    this.vendorsContainer.innerHTML += [
      elements.map((element) => this.createElement(element)).join(""),
    ];
  }

  // create element with vendor details and checkbox
  createElement({ id, name, policyUrl }) {
    return `
        <li key=${id}>
            <span>${name}</span><a href="${policyUrl} target="_blank">link</a><input type="checkbox" value="${id}" name="check">
        </li>
        `;
  }

  // handle checkbox for every vendor and assign every checked to array
  handleCheck() {
    const checkboxes = document.querySelectorAll(`input[name="check"]:checked`);
    let values = [];
    checkboxes.forEach((checkbox) => {
      values.push(checkbox.value);
    });

    this.vendorsAccept = Object.values(values);
    console.log("dziala handleCheck");
  }

  //handle accept button, save chosen vendors in cookies and hide cookie alert
  handleAcceptBtn() {
    document.querySelector(".cookie__container").style.display = "none";
    document.cookie = `Vendors=${this.vendorsAccept.toString()};`;
  }

  // handle reject button and hide cookie alert
  handleRejectBtn() {
    document.querySelector(".cookie__container").style.display = "none";
  }
}

const cookie = new CookiesAlert();
cookie.manageCookies();
