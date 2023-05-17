FROM node:18.16.0 as builder

WORKDIR /build
# Write code to create a bundled file in the /build/dist directory


FROM node:18.16.0-slim

WORKDIR /app
# Write code to copy a bundled file from builder's /build/dist to /app/dist


# Run dist/index.js on node.
