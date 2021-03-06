class CookiesAlert {
  constructor() {
    this.vendors = new Object();
    this.vendorsAccept = new Array();
    this.API = "https://optad360.mgr.consensu.org/cmp/v2/vendor-list.json";

    this.vendorsContainer = document.querySelector(".cookie__content ul");
    this.checkboxes = Array.from(
      document.querySelectorAll(`input[name="check"]:checked`)
    );
    this.acceptBtn = document.querySelector("#accept");
    this.rejectBtn = document.querySelector("#reject");
  }

  // create list of vendors
  async manageCookies() {
    const mainWrapper = document.querySelector(".main__wrapper");
    
    // check if cookie exists and make an action for styling
    if (this.getCookie("Vendors") != null) {
      document.querySelector(".cookie").style.display = "none";
      mainWrapper.style.filter = "none";
      document.body.style.overflowY = "scroll";
    } else {
      mainWrapper.style.filter = "blur(4px)";
      document.body.style.overflowY = "hidden";
    }

    this.pullVendors();

    // onClick validate if any checkbox is matched and make an action
    this.acceptBtn.addEventListener("click", () => {
      const checkboxes = document.querySelectorAll(`input[name="check"]:checked`);
      if(checkboxes.length <= 0) {
        this.handleReject()
      } else {
        this.handleCheck();
        this.handleAccept();
      }
    });

    // onClick call the function
    this.rejectBtn.addEventListener("click", () => {
      this.handleReject();
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
        <li key=${id} class="cookie__element">
            <span>${name}</span>
            <span>
            <a href="${policyUrl} target="_blank">policyUrl</a><input type="checkbox" value="${id}" name="check" checked>
            </span>
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
  }

  //handle accept button, save chosen vendors in cookies, hide cookie alert and setup cookie expire time
  handleAccept() {
    document.querySelector(".cookie").style.display = "none";
    document.querySelector(".main__wrapper").style.filter = "none";
    document.body.style.overflowY = "scroll";
    document.cookie = `Vendors=${this.vendorsAccept}; max-age=86400; path=/;`;
  }

  // handle reject button and hide cookie alert
  handleReject() {
    window.location.href = "https://www.pudelek.pl/";
  }

  // get cookie value
  getCookie(name) {
    const cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
      let cookiePair = cookieArr[i].split("=");
      if (name == cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  }
}

const cookie = new CookiesAlert();
cookie.manageCookies();
