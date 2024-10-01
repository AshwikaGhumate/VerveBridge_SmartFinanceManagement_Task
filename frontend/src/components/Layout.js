// src/components/Layout.js
// src/components/Layout.js
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Finance Manager
          </Typography>
          <Button color="inherit" component={Link} to="/">Dashboard</Button>
          <Button color="inherit" component={Link} to="/expenses">Expenses</Button>
          <Button color="inherit" component={Link} to="/budget">Budget</Button>
          <Button color="inherit" component={Link} to="/goals">Goals</Button>
          <Button color="inherit" component={Link} to="/ai-assistant">AI Assistant</Button>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
















// import React from "react";
// import { Box, AppBar, Toolbar, Typography, CssBaseline, Drawer, List, ListItem, ListItemText, Divider } from "@mui/material";
// import { Link } from "react-router-dom";

// const drawerWidth = 240;

// function Layout({ children }) {
//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
//         <Toolbar>
//           <Typography variant="h6" noWrap component="div">
//             Smart Personal Finance Manager
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
//         }}
//         variant="permanent"
//         anchor="left"
//       >
//         <Toolbar />
//         <Divider />
//         <List>
//           {["Dashboard", "Expense Tracker", "Budget Manager", "Goals", "AI Assistant"].map((text, index) => (
//             <ListItem button component={Link} to={`/${text.toLowerCase().replace(/\s+/g, '')}`} key={text}>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//       <Box
//         component="main"
//         sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, marginLeft: `${drawerWidth}px` }}
//       >
//         <Toolbar />
//         {children}
//       </Box>
//     </Box>
//   );
// }

// export default Layout;
