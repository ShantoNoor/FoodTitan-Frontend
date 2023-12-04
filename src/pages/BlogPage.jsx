import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container } from "@mui/material";

const BlogPage = () => {
  return (
    <Container sx={{ mt: 2 }}>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>What is One way data binding?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            One why data binging means that data is passed down to child from
            parent in react. React can not send data from child to parent. Thus
            react only support one way data binding
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>What is NPM in node.js?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            NPM refers to as Node Package Manager for JavaScript Programming
            Language.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>
            Different between Mongodb database vs mySQL database.
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The main difference between Mongodb database vs MySQL database is
            MySQL is a relatinonal database which uses sql to query into the
            database, on the other hand mongodb is document oriented database
            also called no sql database, here we do not need sql to query into
            the database
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default BlogPage;
