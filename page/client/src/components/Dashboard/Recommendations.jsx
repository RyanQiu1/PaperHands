import React, { useState } from "react";
import { Link } from "@material-ui/core";
import Title from "../Template/Title.jsx";
import SaleModal from "./SaleModal";
import styles from "./Dashboard.module.css";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
 } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
      borderRadius: 15,
      margin: '10px 10px',
      maxWidth: 1180
  },
  tableHeaderCell: {
      fontWeight: 'bold',
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.getContrastText(theme.palette.primary.dark)
  },
  avatar: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.getContrastText(theme.palette.primary.light)
  },
  name: {
      fontWeight: 'bold',
      color: theme.palette.secondary.dark
  },
  status: {
      fontWeight: 'bold',
      fontSize: '0.75rem',
      color: 'white',
      backgroundColor: 'grey',
      borderRadius: 8,
      padding: '3px 10px',
      display: 'inline-block'
  }
}));

const Recommendations = ({ purchasedStocks }) => {
  const classes = useStyles();

  const roundNumber = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Title>Top 5 Daily Stocks Recommendations</Title>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Company Ticker</TableCell>
            <TableCell className={classes.tableHeaderCell}>Name</TableCell>
            <TableCell align="left" className={classes.tableHeaderCell}>PB Value</TableCell>
            <TableCell align="right" className={classes.tableHeaderCell}>Previous PE</TableCell>
            <TableCell align="right" className={classes.tableHeaderCell}>Current PE</TableCell>
            <TableCell align="right" className={classes.tableHeaderCell}>Increased PE Percentage</TableCell>
            <TableCell align="right" className={classes.tableHeaderCell}>????</TableCell>
            <TableCell align="right" className={classes.tableHeaderCell}>Recommendation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
        { // enter the data based on what u want
          // formula, get the last 2 PE ratio, if current PE -> previous PE -> Buy 
          // Top 5 stocks -> Biggest % differnece of the PE 
        }

        {purchasedStocks.map((row) => {
              const difference =
                (row.currentPrice - row.purchasePrice) / row.currentPrice;
              const purchaseTotal =
                Number(row.quantity) * Number(row.purchasePrice);
              const currentTotal =
                Number(row.quantity) * Number(row.currentPrice);
              return (
                <TableRow key={row.id}>
                  <TableCell>
                    <Link onClick={() => openSaleModal(row)}>{row.ticker}</Link>
                  </TableCell>
                  <TableCell>{row.name || "----"}</TableCell>
                  <TableCell>{row.quantity || "----"}</TableCell>
                  <TableCell align="right">
                    ${row.purchasePrice.toLocaleString() || "----"}
                  </TableCell>
                  <TableCell align="right">
                    ${roundNumber(purchaseTotal).toLocaleString() || "----"}
                  </TableCell>
                  <TableCell
                    align="right"
                    className={
                      row.currentPrice >= row.purchasePrice
                        ? styles.positive
                        : styles.negative
                    }
                  >
                    ${row.currentPrice.toLocaleString() || "----"}
                  </TableCell>
                  <TableCell
                    align="right"
                    className={
                      currentTotal >= purchaseTotal
                        ? styles.positive
                        : styles.negative
                    }
                  >
                    ${roundNumber(currentTotal).toLocaleString() || "----"}
                  </TableCell>
                  <TableCell
                    align="right"
                    className={
                      difference >= 0 ? styles.positive : styles.negative
                    }
                  >
                    {difference >= 0 ? "▲" : "▼"}{" "}
                    {Math.abs(difference * 100).toFixed(2)}%
                  </TableCell>
                </TableRow>
              );
            })}

                
        </TableBody>
        <TableFooter>

        </TableFooter>
      </Table>
    </TableContainer>
  )
};

export default Recommendations;

