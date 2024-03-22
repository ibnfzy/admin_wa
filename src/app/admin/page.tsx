"use client";
import * as React from "react";
import {
  Button,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TableIcon from "@mui/icons-material/WhatsApp";
import AddIcon from "@mui/icons-material/AddLink";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

interface Collumn {
  id: "name" | "id" | "delete" | "send";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Collumn[] = [
  { id: "id", label: "#" },
  { id: "name", label: "Session", minWidth: 170 },
  { id: "send", label: "Send Message" },
  { id: "delete", label: "Delete" },
];

interface Data {
  name: string;
}

function createData(name: string): Data {
  return { name };
}

const rows = [createData("TEST"), createData("TEST2"), createData("TEST3")];

export default function Admin() {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem key={"Whatsapp Session"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <TableIcon />
            </ListItemIcon>
            <ListItemText primary={"Whatsapp Session"} />
          </ListItemButton>
        </ListItem>

        <ListItem key={"Add Session"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={"Add Session"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="success">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin WA
            </Typography>
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Card sx={{ minWidth: 275 }} style={{ margin: 40 }}>
        <CardHeader title="Table Sessions" />
        <Divider />
        <CardContent>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, idx) => {
                      let no = idx + 1;
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                          <TableCell>{no}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>
                            <IconButton size="small" title="Send a message">
                              Send a message
                              <SendIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <IconButton size="small">
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </CardContent>
      </Card>
    </div>
  );
}
