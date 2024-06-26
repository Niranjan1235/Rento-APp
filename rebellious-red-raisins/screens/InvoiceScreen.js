import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView, Alert } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const App = () => {
  const [showNewInvoiceForm, setShowNewInvoiceForm] = useState(false);
  const [invoices, setInvoices] = useState([
    { id: '92', tenant: 'Govardhan', amount: '4000.0', date: '22/07/24', status: 'Paid' }
  ]);
  const [newInvoice, setNewInvoice] = useState({
    tenant: '',
    amount: '',
    date: '',
    status: 'Due'
  });

  const handleInputChange = (field, value) => {
    setNewInvoice({ ...newInvoice, [field]: value });
  };

  const handleSubmit = () => {
    if (newInvoice.tenant && newInvoice.amount && newInvoice.date) {
      const id = (invoices.length + 1).toString();
      setInvoices([...invoices, { id, ...newInvoice }]);
      setShowNewInvoiceForm(false);
      setNewInvoice({ tenant: '', amount: '', date: '', status: 'Due' });
      Alert.alert('Success', 'New invoice added successfully!');
    } else {
      Alert.alert('Error', 'Please fill all fields');
    }
  };

  const MainScreen = () => (
    <>
      <Text style={styles.header}>Rento</Text>
      <View style={styles.illustration}>
        <FontAwesome name="file-text-o" size={50} color="#e91e63" />
        <MaterialIcons name="payment" size={50} color="#3f51b5" />
        <FontAwesome name="gear" size={50} color="#9c27b0" />
      </View>
      <Text style={styles.subHeader}>Tenants Rent invoices</Text>
      {invoices.map((invoice) => (
        <View key={invoice.id} style={styles.invoiceCard}>
          <Text style={styles.invoiceId}>Invoice ID #{invoice.id}</Text>
          <Text style={styles.tenantName}>{invoice.tenant}</Text>
          <Text style={styles.amount}>$ {invoice.amount}</Text>
          <Text style={styles.date}>{invoice.date}</Text>
          <Text style={[styles.paidStatus, { color: invoice.status === 'Paid' ? 'green' : 'orange' }]}>
            {invoice.status}
          </Text>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={() => setShowNewInvoiceForm(true)}>
        <Text style={styles.addButtonText}>Add Invoice</Text>
      </TouchableOpacity>
    </>
  );

  const NewInvoiceForm = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Rento</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => setShowNewInvoiceForm(false)}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <Image
       // source={require('./assets/bill-illustration.png')}
        style={styles.formIllustration}
      />
      <Text style={styles.formTitle}>New Tenant Invoice</Text>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#000" style={styles.inputIcon} />
          <TextInput 
            style={styles.input} 
            placeholder="Enter Tenant" 
            value={newInvoice.tenant}
            onChangeText={(text) => handleInputChange('tenant', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="credit-card" size={20} color="#000" style={styles.inputIcon} />
          <TextInput 
            style={styles.input} 
            placeholder="Enter Amount" 
            keyboardType="numeric"
            value={newInvoice.amount}
            onChangeText={(text) => handleInputChange('amount', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="calendar" size={20} color="#000" style={styles.inputIcon} />
          <TextInput 
            style={styles.input} 
            placeholder="Enter Date" 
            value={newInvoice.date}
            onChangeText={(text) => handleInputChange('date', text)}
          />
        </View>
        <View style={styles.statusContainer}>
          <FontAwesome name="check-circle" size={20} color="#000" style={styles.inputIcon} />
          <Text style={styles.statusText}>Status</Text>
          <TouchableOpacity
            style={[styles.statusButton, newInvoice.status === 'Paid' && styles.activeStatus]}
            onPress={() => handleInputChange('status', 'Paid')}
          >
            <Text style={styles.statusButtonText}>Paid</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statusButton, newInvoice.status === 'Due' && styles.activeStatus]}
            onPress={() => handleInputChange('status', 'Due')}
          >
            <Text style={styles.statusButtonText}>Due</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <ScrollView style={styles.container}>
      {showNewInvoiceForm ? <NewInvoiceForm /> : <MainScreen />}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
   container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#e91e63',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  illustration: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 200,
    marginBottom: 20,
  },
  formIllustration: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  invoiceCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  invoiceId: {
    fontWeight: 'bold',
  },
  tenantName: {
    marginTop: 5,
  },
  amount: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  date: {
    marginTop: 5,
  },
  paidStatus: {
    marginTop: 5,
    color: 'green',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#e91e63',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  form: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginRight: 10,
  },
  statusButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginHorizontal: 5,
    backgroundColor: '#ddd',
  },
  activeStatus: {
    backgroundColor: '#4CAF50',
  },
  statusButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#e91e63',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  
});

export default App;