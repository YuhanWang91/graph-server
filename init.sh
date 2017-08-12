#!/bin/bash
cd backend
npm install
echo "backend dependencies installed"
cd ../frontend
npm install
npm install d3@4.9.0
echo "frontend dependencies installed"
