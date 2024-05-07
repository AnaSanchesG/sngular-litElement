import { LitElement, html, css } from "lit-element";
import { getData } from "./src/utils/getServiceData";

class HomePage extends LitElement {
  static get styles() {
    return css`

    th,td {
      padding: 15px;
      text-align: left;
    }
      th {
        border-bottom: 3px solid #dddddd;
        background-color: #ecf3f1;
      }

      td {
        border-bottom: 1px solid #dddddd;
      }

      tr:hover {
        background-color: #F3F7F6;
      }

      .container{
        display: flex;
        justify-content: center;
        margin-top:30px;
      }
    `;
  }

  static get properties() {
    return {
      users: { type: Object },
    };
  }

  constructor() {
    super();
    this.users = [];
  }

  firstUpdated() {
    this.getData();
  }

  async getData() {
    const data = await getData();
    this.users = data;
  }

  render() {
    return html`
      <div class="container">
      <table>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Ubicación</th>
        </tr>
        ${this.users.map(
          ({ name, username, email, address }) => html`
            <tr>
              <td>${name} - <i>${username}</i></td>
              <td>${email}</td>
              <td>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=${address.geo.lat},${address.geo.lng}&zoom=0"
                  target="_blank"
                >
                  Ir a su ubicación
                </a>
              </td>
            </tr>
          `
        )}
      </table>
      </div>
    `;
  }
}

customElements.define("home-page", HomePage);
