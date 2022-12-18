variable "domain" {
  description = "Domain that will be used for the static app"
  type = string
}

variable "service_name" {
  description = "Azure service name to create"
  type = string
}

variable "location" {
  description = "Azure location to deploy to"
  type = string
}

variable "subscription_id" {
  description = "Azure subscription"
  type = string
  sensitive = true
}

variable "tenant_id" {
  description = "Azure tenant"
  type = string
  sensitive = true
}

variable "client_id" {
  description = "Azure client id for authentication"
  type = string
  sensitive = true
}

variable "client_secret" {
  description = "Azure secret for authentication"
  type = string
  sensitive = true
}