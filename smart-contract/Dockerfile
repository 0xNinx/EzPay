# Build stage
FROM rust:1.75 as builder

WORKDIR /app

RUN rustup target add wasm32-unknown-unknown

COPY Cargo.toml Cargo.lock ./
COPY src ./src

RUN cargo build --target wasm32-unknown-unknown --release

# Optimization stage
FROM binaryen/wabt:latest as optimizer

WORKDIR /app
COPY --from=builder /app/target/wasm32-unknown-unknown/release/ezpay.wasm ./

RUN wasm-opt ezpay.wasm -O3 --strip-debug -o ezpay_optimized.wasm

# Runtime stage
FROM alpine:latest

WORKDIR /app

COPY --from=optimizer /app/ezpay_optimized.wasm ./

CMD ["sh", "-c", "echo 'WASM contract ready for deployment'"]
