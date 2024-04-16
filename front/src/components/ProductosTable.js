import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, Box
} from '@mui/material';
import DetailsModal from './DetailsModal';

const HoverTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    cursor: 'pointer'
  },
}));

function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const mapProductData = (products) => {
    return products.map(product => ({
      productId: product.product_id,
      name: product.name,
      manaCost: product.mana_cost || 'N/A',
      typeLine: product.type_line,
      setName: product.set_name,
      rarity: product.rarity,
      price: product.prices ? `${product.prices.toFixed(2)} USD` : 'N/A',
      quantity: product.quantity,
      inStock: product.is_stock ? 'Yes' : 'No',
    }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/products');
        if (response.data.ok && response.data.body) {
            setProducts(mapProductData(response.data.body));
        } else {
          throw new Error('Failed to load products: Server responded with an error');
        }
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchProducts();
  }, []); // Dependency array is still empty

  const handleRowClick = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/products/${productId}`);
      if (response.data.ok && response.data.body) {
        setSelectedProduct(response.data.body);
        setModalOpen(true);
      } else {
        throw new Error('Failed to load product details: Server responded with an error');
      }
    } catch (error) {
      console.error('Failed to fetch product details', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Type Line</TableCell>
              <TableCell>Set Name</TableCell>
              <TableCell>Rarity</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <HoverTableRow key={product.productId} onClick={() => handleRowClick(product.productId)}>
                <TableCell component="th" scope="row">{product.name}</TableCell>
                <TableCell>{product.typeLine}</TableCell>
                <TableCell>{product.setName}</TableCell>
                <TableCell>{product.rarity}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
              </HoverTableRow>
            ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="flex-end">
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </TableContainer>
      {selectedProduct && (
        <DetailsModal
          open={modalOpen}
          handleClose={() => {
            setModalOpen(false);
            setSelectedProduct(null); // Clear selected product on close
          }}
          product={selectedProduct}
        />
      )}
    </>
  );
}

export default ProductsTable;
