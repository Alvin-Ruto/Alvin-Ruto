// Health check endpoint for Vercel
export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Alvin Kibet Portfolio',
    version: '1.0.0'
  });
}
