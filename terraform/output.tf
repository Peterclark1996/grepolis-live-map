output "storage_account_connection_string" {
  value = azurerm_storage_account.main.primary_connection_string
  sensitive = true
}

output "storage_account_url" {
  value = azurerm_storage_account.main.primary_blob_endpoint
  sensitive = true
}