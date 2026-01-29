use std::net::SocketAddr;

use axum::{
    handler::HandlerWithoutStateExt,
    http::StatusCode,
    response::{Html, IntoResponse},
    Router,
};
use tower_http::services::ServeDir;

async fn not_found() -> impl IntoResponse {
    let html = tokio::fs::read_to_string("./frontend/dist/index.html")
        .await
        .unwrap_or_else(|_| "Not Found".to_string());
    (StatusCode::NOT_FOUND, Html(html))
}

#[tokio::main]
async fn main() {
    let serve_dir = ServeDir::new("./frontend/dist").not_found_service(not_found.into_service());

    let app = Router::new().nest_service("/", serve_dir);

    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    println!("Listening on http://{}", addr);

    // crash if unwrap fr
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
