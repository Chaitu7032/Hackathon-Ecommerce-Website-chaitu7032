/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {}, // Tailwind CSS plugin
    autoprefixer: {
      // Autoprefixer will now use the browserslist config
      overrideBrowserslist: undefined, // Use browserslist config
      grid: true, // Enable CSS Grid support
    },
    'postcss-preset-env': {
      // Use modern CSS features based on browserslist
      stage: 2,
      features: {
        'custom-properties': false, // Let Tailwind handle CSS custom properties
      },
    },
  },
};

export default config; // export default ka use karein
