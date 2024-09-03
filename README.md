# chattyAI

Chatty AI is a tool that allows you to store your chats from various LLMs in one place. Its frontend is built using Vue.js, Pinia, VeeValidate, VueUse, and @vueuse/motion, with components delivered through shadcn-vue for a smooth user experience.

## Prerequisites

- Node.js v.20 or higher

## Installation

### Clone a repository

```bash
git clone https://github.com/marchewadm/chattyAI.git
```

### Navigate to the root directory

```bash
cd chattyAI
```

### Install all necessary dependencies

```bash
npm install
```

## Before usage

Before running application, make sure that `.env` file is created.

The `.env` file should look like this:

```
VITE_BACKEND_URL=BACKEND_API_URL
```

NOTE:

- Remember to adjust `VITE_BACKEND_URL` according to where the backend API is running. If it is running locally, your URL should look like this: `VITE_BACKEND_URL=http://localhost:8000/api`.

## Usage

Run one of the commands below to start using your app:

- Development mode:

  ```bash
  # After executing command below, the server should start running at the address http://localhost:5173
  npm run dev
  ```

- Production mode:
  ```bash
  npm run build
  ```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
