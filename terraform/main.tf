terraform {
  backend "azurerm" {}
}

provider "azurerm" {
  features {}

  tenant_id = var.tenant_id
  subscription_id = var.subscription_id
  client_id = var.client_id
  client_secret = var.client_secret
}

resource "azurerm_resource_group" "main" {
  name = "${var.service_name}-rg"
  location = var.location
}

resource "random_pet" "main" {
  separator = ""
  length = 2
}

resource "azurerm_storage_account" "main" {
  name = lower(random_pet.main.id)
  resource_group_name = azurerm_resource_group.main.name
  location = var.location
  account_tier = "Standard"
  account_replication_type = "LRS"

  enable_https_traffic_only = false

  static_website {
    error_404_document = "index.html"
    index_document = "index.html"
  }

  blob_properties{
    cors_rule{
      allowed_headers = ["*"]
      allowed_methods = ["GET","OPTIONS"]
      allowed_origins = ["https://${var.domain}"]
      exposed_headers = ["*"]
      max_age_in_seconds = 3600
    }
  }

  custom_domain {
    name = var.domain
    use_subdomain = true
  }

  lifecycle {
    ignore_changes = [
      custom_domain[0].use_subdomain
    ]
  }
}

resource "azurerm_service_plan" "main" {
  name = "${var.service_name}-service-plan"
  location = var.location
  resource_group_name = azurerm_resource_group.main.name

  sku_name = "B1"
  os_type = "Linux"
}

resource "azurerm_linux_function_app" "main" {
  name = "${var.service_name}-azfunc"
  resource_group_name = azurerm_resource_group.main.name
  location = var.location
  
  service_plan_id = azurerm_service_plan.main.id
  storage_account_name = azurerm_storage_account.main.name
  storage_account_access_key = azurerm_storage_account.main.primary_access_key

  site_config {
    application_stack {
      node_version = "14"
    }
  }

  app_settings = {
    AZURE_STORAGE_CONNECTION = azurerm_storage_account.main.primary_connection_string
  }
}