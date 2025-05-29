# Job Portal UI

A modern job portal application built with Next.js and MongoDB, featuring a clean and intuitive user interface for job seekers and employers.

## Features

- Browse job listings with filtering options
- Create and manage job postings
- Interactive salary range slider
- Responsive design for all devices
- Real-time job updates with MongoDB integration

## Tech Stack

- **Frontend**: Next.js 14
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Deployment**: Railway

## Getting Started

### Prerequisites

- Node.js (v20 recommended)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kingslayer458/job-portal-with-mongodb.git
cd job-portal-with-mongodb
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your MongoDB connection:
```
MONGODB_URI=your_mongodb_connection_string
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The application is configured for deployment on Railway using Docker. To deploy:

1. Push your code to GitHub
2. Create a new project on Railway
3. Connect your GitHub repository
4. Configure environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: production
   - `PORT`: 3000

## Project Structure

```
job-portal-ui/
├── app/
│   ├── api/
│   │   └── jobs/
│   ├── components/
│   ├── lib/
│   └── page.tsx
├── public/
├── styles/
├── Dockerfile
├── railway.json
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database solution
- Railway for the deployment platform
