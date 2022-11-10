#!/usr/bin/env bash

cargo install cross --git https://github.com/cross-rs/cross && \
cross build --release --target aarch64-unknown-linux-gnu && \
cp ./target/aarch64-unknown-linux-gnu/release/secrets-loader ./build/aarch64-unknown-linux-gnu;
