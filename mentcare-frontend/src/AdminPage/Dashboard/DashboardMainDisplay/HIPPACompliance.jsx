import { useState } from 'react';
import { Button, HStack, Text, VStack, Box } from '@chakra-ui/react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfFile from '../../../assets/compliance.pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const HIPPACompliance = () => {
  const [file, setFile] = useState(pdfFile);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const prevPage = () => {
    if (pageNumber === 1) return;
    changePage(-1);
  };

  const nextPage = () => {
    if (pageNumber === numPages) return;
    changePage(1);
  };

  return (
    <VStack alignItems='center' justifyContent='center'>
      <VStack gap='5px' paddingTop='10px'>
        <HStack gap='5px'>
          <Button type='button' disabled={pageNumber <= 1} onClick={prevPage}>
            Previous
          </Button>
          <Button
            type='button'
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            Next
          </Button>
        </HStack>
        <Text textAlign='center' fontWeight='bold'>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </Text>
      </VStack>
      <Box
        border='1px solid grey'
        boxShadow='3px 10px 102px -70px rgba(0,0,0,1)'
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          border='1px solid blue'
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            scale='1'
          />
        </Document>
      </Box>
    </VStack>
  );
};

export default HIPPACompliance;
