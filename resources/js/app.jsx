import './bootstrap';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ThemeProvider from './contexts/ThemeContext';

createInertiaApp({
    title: (title) => `${title} - TechCorp Solutions`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
        // <ThemeProvider>
            <App {...props} />
        // </ThemeProvider>
    );
    },
    progress: {
        color: '#3b82f6',
    },
});
