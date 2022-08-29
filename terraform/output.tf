output "storage_account_url" {
  value = azurerm_storage_account.main.primary_blob_endpoint
  sensitive = true
}