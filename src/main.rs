use std::net::SocketAddr;

use axum::Router;
use tower_http::services::{ServeDir, ServeFile};

#[tokio::main]
async fn main() {
    let serve_dir = ServeDir::new("./frontend/dist")
        .not_found_service(ServeFile::new("./frontend/dist/index.html"));

    let app = Router::new().nest_service("/", serve_dir);

    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    println!("Listening on http://{}", addr);

    // crash if unwrap fr
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
