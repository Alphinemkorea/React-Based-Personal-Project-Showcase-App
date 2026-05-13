export default function Footer() {
    return (
        <footer
            style={{
                textAlign: "center",
                padding: "20px",
                marginTop: "40px",
                background: "#111",
                color: "#fff",
            }}
        >
            <h3>Gaming Tech Store 🎮</h3>
            <p>© {new Date().getFullYear()} All Rights Reserved</p>
        </footer>
    );
}