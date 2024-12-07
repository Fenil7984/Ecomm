/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        registerBg: {
          400: "#161032"
        },
        topnav: {
          400: "#D8F4E2"
        },
        topnavBorderBottom: {
          400: "#39B4AC"
        },
        Adminnav: {
          400: "#322738"
        },
        Adminnav2: {
          400: "#100217",
        },
        AdminForm: {
          400: "#A797BD"
        },
        shipping: {
          400: "#FDDDE4"
        },
        order: {
          400: "#D1E8F2"
        },
        money: {
          400: "#CDEBBC"
        },
        promotion: {
          400: "#CDD4F8"
        },
        sell: {
          400: "#F6DBF6"
        },
        support: {
          400: "#FFF2E5"
        },
        text: {
          400: "#088178"
        },
        shippingbg: {
          400: "#f4f4f4;"
        }

      },

      backgroundImage: {
        'hero-pattern': "url('../')",
        'footer-texture': "url('/img/footer-texture.png')",
      }
    },
  },
  plugins: [],
}

