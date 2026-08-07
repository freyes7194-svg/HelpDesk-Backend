app.use(
    cors({
        origin: [
            "https://helpdesk-frontend-react.onrender.com",
            "http://localhost:5173"
        ],
        methods:[
            "GET",
            "POST",
            "PUT",
            "DELETE"
        ],
        credentials:true
    })
);