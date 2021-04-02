class CookiesAlert {
  constructor() {
    this.vendors = new Object();
    this.API = "https://optad360.mgr.consensu.org/cmp/v2/vendor-list.json";

    this.vendorsContainer = document.querySelector(".vendors__container ul");
    this.checkboxes = document.querySelectorAll(`input[name="check"]:checked`);
  }

  // create list of vendors
  async drawList() {
    this.pullVendors();

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
}

const cookie = new CookiesAlert();
cookie.drawList();
