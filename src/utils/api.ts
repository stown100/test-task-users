import { TUsers } from "../global";

class Api {
  url: string;
  constructor({ url }: { url: string }) {
    this.url = url;
  }

  getUsers(searchParam: string): Promise<TUsers> {
    return fetch(`${this.url}users?name=${searchParam}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._handleResponse);
  }

  addUser(email: string, permissions: { permission: string; id: string }[]) {
    return fetch(`${this.url}users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, permissions }),
    }).then(this._handleResponse);
  }

  deleteUser(userId: string): Promise<TUsers> {
    return fetch(`${this.url}users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._handleResponse);
  }

  private _handleResponse(res: Response) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  url: "https://641de2fd0596099ce156cb4d.mockapi.io/api/",
});

export default api;
