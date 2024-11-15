import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  useTheme,
  Divider
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  Email
} from '@mui/icons-material';

function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Features',
      items: [
        { text: '3D Shapes'},
        { text: 'Calculations'},
        { text: 'Quiz'},
        { text: 'Progress Tracking'},
      ]
    },
    {
      title: 'Resources',
      items: [
        { text: 'Tutorials'},
        { text: 'Documentation'},
        { text: 'FAQs'},
        { text: 'Help Center'},
      ]
    },
    {
      title: 'Company',
      items: [
        { text: 'About Us'},
        { text: 'Contact'},
        { text: 'Privacy Policy'},
        { text: 'Terms of Service'},
      ]
    }
  ];

  const socialLinks = [
    { icon: <Facebook />, label: 'Facebook' },
    { icon: <Twitter />, label: 'Twitter' },
    { icon: <Instagram />, label: 'Instagram' },
    { icon: <YouTube />, label: 'YouTube' },
    { icon: <Email />, label: 'Email' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        pt: 6,
        pb: 3,
        mt: 'auto',
        borderTop: `1px solid ${theme.palette.divider}`
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-evenly">
          {footerSections.map((section) => (
            <Grid item xs={12} sm={4} md={3} key={section.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {section.title}
              </Typography>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {section.items.map((item) => (
                  <li key={item.text}>
                    <Link
                      component={RouterLink}
                      to={item.path}
                      color="text.secondary"
                      sx={{
                        textDecoration: 'none',
                        '&:hover': {
                          color: theme.palette.primary.main,
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}

          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Connect With Us
            </Typography>
            <Box sx={{ mt: 2 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  sx={{
                    mr: 1,
                    color: 'text.secondary',
                    '&:hover': {
                      color: theme.palette.primary.main
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 6, mb: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Geometry 3D Explorer. All rights reserved.
          </Typography>
          <Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;