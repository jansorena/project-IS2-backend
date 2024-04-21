
import userService from '../services/userService.js';

const renderPage = async (req, res, viewName, title, style) => {
    try {
        const user = await userService.getUserById(req.user.id);
        res.render(viewName, { title, style, user });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};

export const renderHomePage = async (req, res) => {
    await renderPage(req, res, 'home', 'Home', 'home.css');
};

export const renderContact = async (req, res) => {
    await renderPage(req, res, 'contact', 'Contact', 'contact.css');
};
