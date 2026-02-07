// API Base URL
const API_BASE_URL = "/api/content";

// DOM Elements
let currentView = "dashboard";

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
  loadDashboardStats();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Categories and Tags navigation
  document.getElementById("nav-categories").addEventListener("click", (e) => {
    e.preventDefault();
    showCategories();
  });

  document.getElementById("nav-tags").addEventListener("click", (e) => {
    e.preventDefault();
    showTags();
  });

  // Category form
  document
    .getElementById("category-form")
    .addEventListener("submit", handleCategorySubmit);

  // Tag form
  document
    .getElementById("tag-form")
    .addEventListener("submit", handleTagSubmit);

  // Navigation links
  document.getElementById("nav-content").addEventListener("click", (e) => {
    e.preventDefault();
    showContentList();
  });

  document.getElementById("nav-add").addEventListener("click", (e) => {
    e.preventDefault();
    showAddContentForm();
  });

  // Add content form
  document
    .getElementById("add-content-form")
    .addEventListener("submit", handleAddContent);
}

// Show dashboard
function showDashboard() {
  currentView = "dashboard";
  document.getElementById("page-title").textContent = "Dashboard";
  document.getElementById("dashboard-section").style.display = "block";
  document.getElementById("content-section").style.display = "none";
  document.getElementById("add-content-section").style.display = "none";
  document.getElementById("categories-section").style.display = "none";
  document.getElementById("tags-section").style.display = "none";
  loadDashboardStats();
}

// Show content list
function showContentList() {
  currentView = "content";
  document.getElementById("page-title").textContent = "All Content";
  document.getElementById("dashboard-section").style.display = "none";
  document.getElementById("content-section").style.display = "block";
  document.getElementById("add-content-section").style.display = "none";
  document.getElementById("categories-section").style.display = "none";
  document.getElementById("tags-section").style.display = "none";
  loadContentList();
}

// Show add content form
function showAddContentForm() {
  currentView = "add";
  document.getElementById("page-title").textContent = "Add New Content";
  document.getElementById("dashboard-section").style.display = "none";
  document.getElementById("content-section").style.display = "none";
  document.getElementById("add-content-section").style.display = "block";
  document.getElementById("categories-section").style.display = "none";
  document.getElementById("tags-section").style.display = "none";
}

// Load dashboard statistics
async function loadDashboardStats() {
  try {
    const response = await fetch(API_BASE_URL);
    const content = await response.json();

    const totalPosts = content.length;
    const publishedPosts = content.filter(
      (item) => item.status === "published",
    ).length;
    const draftPosts = content.filter((item) => item.status === "draft").length;
    const pagesCount = content.filter((item) => item.type === "page").length;

    document.getElementById("total-posts").textContent = totalPosts;
    document.getElementById("published-posts").textContent = publishedPosts;
    document.getElementById("draft-posts").textContent = draftPosts;
    document.getElementById("pages-count").textContent = pagesCount;

    // Load recent content
    loadRecentContent(content.slice(0, 5));
  } catch (error) {
    console.error("Error loading stats:", error);
    showAlert("Error loading dashboard statistics", "danger");
  }
}

// Load recent content
function loadRecentContent(content) {
  const tbody = document.getElementById("recent-content");
  tbody.innerHTML = "";

  if (content.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="5" class="text-center">No content yet</td></tr>';
    return;
  }

  content.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.title}</td>
            <td><span class="badge bg-info">${item.type}</span></td>
            <td><span class="badge ${item.status === "published" ? "bg-success" : "bg-warning"}">${item.status}</span></td>
            <td>${new Date(item.createdAt).toLocaleDateString()}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="editContent('${item._id}')">
                    <i class="bi bi-pencil"></i>
                </button>
            </td>
        `;
    tbody.appendChild(row);
  });
}

// Load content list
async function loadContentList() {
  try {
    const response = await fetch(API_BASE_URL);
    const content = await response.json();

    const tableBody = document.getElementById("content-table-body");
    tableBody.innerHTML = "";

    content.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${item.title}</td>
                <td><span class="badge bg-info">${item.type}</span></td>
                <td><span class="badge ${item.status === "published" ? "bg-success" : "bg-warning"}">${item.status}</span></td>
                <td>${new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="editContent('${item._id}')">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger ms-1" onclick="deleteContent('${item._id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading content:", error);
    showAlert("Error loading content list", "danger");
  }
}

// Get content for editing
async function getContentForEdit(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/edit/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch content");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching content for edit:", error);
    throw error;
  }
}

// Edit content
async function editContent(id) {
  try {
    // Fetch the content data
    const content = await getContentForEdit(id);

    // Populate the form
    document.getElementById("content-title").value = content.title;
    document.getElementById("content-type").value = content.type || "post";
    document.getElementById("content-status").value = content.status || "draft";
    document.getElementById("content-body").value = content.content;
    document.getElementById("content-tags").value = content.tags
      ? content.tags.join(", ")
      : "";

    // Change form to update mode
    const form = document.getElementById("add-content-form");
    form.dataset.editId = id;
    form.querySelector('button[type="submit"]').textContent = "Update Content";

    // Show edit form
    showAddContentForm();
    document.getElementById("page-title").textContent = "Edit Content";

    // Scroll to top
    window.scrollTo(0, 0);
  } catch (error) {
    console.error("Error loading content for edit:", error);
    showAlert("Error loading content for editing", "danger");
  }
}

// Handle add/update content form submission
async function handleAddContent(e) {
  e.preventDefault();

  const form = e.target;
  const isEditMode = form.dataset.editId;

  const contentData = {
    title: document.getElementById("content-title").value,
    type: document.getElementById("content-type").value,
    status: document.getElementById("content-status").value,
    content: document.getElementById("content-body").value,
    tags: document
      .getElementById("content-tags")
      .value.split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag),
    editedBy: "admin",
  };

  const url = isEditMode ? `${API_BASE_URL}/${isEditMode}` : API_BASE_URL;
  const method = isEditMode ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contentData),
    });

    if (response.ok) {
      const result = await response.json();
      const message = isEditMode
        ? "Content updated successfully!"
        : "Content created successfully!";

      showAlert(message, "success");
      clearForm();

      // Reset form mode
      delete form.dataset.editId;
      form.querySelector('button[type="submit"]').textContent = "Save Content";

      // Return to appropriate view
      setTimeout(() => {
        if (isEditMode) {
          showContentList();
        } else {
          showDashboard();
        }
      }, 1500);
    } else {
      const error = await response.json();
      showAlert(`Error: ${error.message || error.error}`, "danger");
    }
  } catch (error) {
    console.error("Error saving content:", error);
    showAlert("Error saving content", "danger");
  }
}

// Delete content
async function deleteContent(id) {
  if (!confirm("Are you sure you want to delete this content?")) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      showAlert("Content deleted successfully!", "success");
      if (currentView === "content") {
        loadContentList();
      } else {
        loadDashboardStats();
      }
    } else {
      const error = await response.json();
      showAlert(`Error: ${error.error}`, "danger");
    }
  } catch (error) {
    console.error("Error deleting content:", error);
    showAlert("Error deleting content", "danger");
  }
}

// Clear form
function clearForm() {
  document.getElementById("add-content-form").reset();
  delete document.getElementById("add-content-form").dataset.editId;
  document.querySelector(
    '#add-content-form button[type="submit"]',
  ).textContent = "Save Content";
}

// Refresh content
function refreshContent() {
  if (currentView === "dashboard") {
    loadDashboardStats();
  } else if (currentView === "content") {
    loadContentList();
  }
}

// Show alert message
function showAlert(message, type) {
  // Remove any existing alerts
  const existingAlert = document.querySelector(".alert");
  if (existingAlert) {
    existingAlert.remove();
  }

  // Create alert element
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.role = "alert";
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  // Add alert to page
  const mainContent = document.querySelector(".main-content");
  mainContent.insertBefore(alertDiv, mainContent.firstChild);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove();
    }
  }, 5000);
}

// ==================== CATEGORIES & TAGS FUNCTIONALITY ====================

// Show categories section
function showCategories() {
  currentView = "categories";
  document.getElementById("page-title").textContent = "Categories";
  document.getElementById("dashboard-section").style.display = "none";
  document.getElementById("content-section").style.display = "none";
  document.getElementById("add-content-section").style.display = "none";
  document.getElementById("categories-section").style.display = "block";
  document.getElementById("tags-section").style.display = "none";
  loadCategories();
}

// Show tags section
function showTags() {
  currentView = "tags";
  document.getElementById("page-title").textContent = "Tags";
  document.getElementById("dashboard-section").style.display = "none";
  document.getElementById("content-section").style.display = "none";
  document.getElementById("add-content-section").style.display = "none";
  document.getElementById("categories-section").style.display = "none";
  document.getElementById("tags-section").style.display = "block";
  loadTags();
}

// Load categories
async function loadCategories() {
  try {
    const response = await fetch("/api/categories");
    const categories = await response.json();

    const tableBody = document.getElementById("categories-table-body");
    tableBody.innerHTML = "";

    categories.forEach((category) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td><strong>${category.name}</strong></td>
                <td>${category.description || "No description"}</td>
                <td><span class="badge bg-info">${category.contentCount || 0}</span></td>
                <td>${new Date(category.createdAt).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="editCategory('${category._id}')">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger ms-1" onclick="deleteCategory('${category._id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading categories:", error);
    showAlert("Error loading categories", "danger");
  }
}

// Load tags
async function loadTags() {
  try {
    const response = await fetch("/api/tags");
    const tags = await response.json();

    const tableBody = document.getElementById("tags-table-body");
    tableBody.innerHTML = "";

    tags.forEach((tag) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td><span class="badge bg-secondary">${tag.name}</span></td>
                <td><span class="badge bg-info">${tag.contentCount || 0}</span></td>
                <td>${new Date(tag.createdAt).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="editTag('${tag._id}')">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger ms-1" onclick="deleteTag('${tag._id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading tags:", error);
    showAlert("Error loading tags", "danger");
  }
}

// Show add category form
function showAddCategoryForm() {
  document.getElementById("add-category-form").style.display = "block";
  document.getElementById("category-form").reset();
  delete document.getElementById("category-form").dataset.editId;
  document.querySelector('#category-form button[type="submit"]').textContent =
    "Save Category";
}

// Hide add category form
function hideAddCategoryForm() {
  document.getElementById("add-category-form").style.display = "none";
}

// Show add tag form
function showAddTagForm() {
  document.getElementById("add-tag-form").style.display = "block";
  document.getElementById("tag-form").reset();
  delete document.getElementById("tag-form").dataset.editId;
  document.querySelector('#tag-form button[type="submit"]').textContent =
    "Save Tag";
}

// Hide add tag form
function hideAddTagForm() {
  document.getElementById("add-tag-form").style.display = "none";
}

// Handle category form submission
async function handleCategorySubmit(e) {
  e.preventDefault();

  const form = e.target;
  const isEditMode = form.dataset.editId;

  const categoryData = {
    name: document.getElementById("category-name").value,
    description: document.getElementById("category-description").value,
  };

  const url = isEditMode ? `/api/categories/${isEditMode}` : "/api/categories";
  const method = isEditMode ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });

    if (response.ok) {
      const result = await response.json();
      const message = isEditMode
        ? "Category updated successfully!"
        : "Category created successfully!";

      showAlert(message, "success");
      hideAddCategoryForm();
      loadCategories();
    } else {
      const error = await response.json();
      showAlert(`Error: ${error.message || error.error}`, "danger");
    }
  } catch (error) {
    console.error("Error saving category:", error);
    showAlert("Error saving category", "danger");
  }
}

// Handle tag form submission
async function handleTagSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const isEditMode = form.dataset.editId;

  const tagData = {
    name: document.getElementById("tag-name").value,
  };

  const url = isEditMode ? `/api/tags/${isEditMode}` : "/api/tags";
  const method = isEditMode ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tagData),
    });

    if (response.ok) {
      const result = await response.json();
      const message = isEditMode
        ? "Tag updated successfully!"
        : "Tag created successfully!";

      showAlert(message, "success");
      hideAddTagForm();
      loadTags();
    } else {
      const error = await response.json();
      showAlert(`Error: ${error.error}`, "danger");
    }
  } catch (error) {
    console.error("Error saving tag:", error);
    showAlert("Error saving tag", "danger");
  }
}

// Edit category
async function editCategory(id) {
  try {
    const response = await fetch(`/api/categories/${id}`);
    const category = await response.json();

    document.getElementById("category-name").value = category.name;
    document.getElementById("category-description").value =
      category.description || "";

    const form = document.getElementById("category-form");
    form.dataset.editId = id;
    form.querySelector('button[type="submit"]').textContent = "Update Category";

    showAddCategoryForm();
  } catch (error) {
    console.error("Error loading category for edit:", error);
    showAlert("Error loading category for editing", "danger");
  }
}

// Edit tag
async function editTag(id) {
  try {
    const response = await fetch(`/api/tags/${id}`);
    const tag = await response.json();

    document.getElementById("tag-name").value = tag.name;

    const form = document.getElementById("tag-form");
    form.dataset.editId = id;
    form.querySelector('button[type="submit"]').textContent = "Update Tag";

    showAddTagForm();
  } catch (error) {
    console.error("Error loading tag for edit:", error);
    showAlert("Error loading tag for editing", "danger");
  }
}

// Delete category
async function deleteCategory(id) {
  if (!confirm("Are you sure you want to delete this category?")) return;

  try {
    const response = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      showAlert("Category deleted successfully!", "success");
      loadCategories();
    } else {
      const error = await response.json();
      showAlert(`Error: ${error.error}`, "danger");
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    showAlert("Error deleting category", "danger");
  }
}

// Delete tag
async function deleteTag(id) {
  if (!confirm("Are you sure you want to delete this tag?")) return;

  try {
    const response = await fetch(`/api/tags/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      showAlert("Tag deleted successfully!", "success");
      loadTags();
    } else {
      const error = await response.json();
      showAlert(`Error: ${error.error}`, "danger");
    }
  } catch (error) {
    console.error("Error deleting tag:", error);
    showAlert("Error deleting tag", "danger");
  }
}

// Make functions available globally
window.showDashboard = showDashboard;
window.showContentList = showContentList;
window.showAddContentForm = showAddContentForm;
window.editContent = editContent;
window.deleteContent = deleteContent;
window.clearForm = clearForm;
window.refreshContent = refreshContent;
window.showCategories = showCategories;
window.showTags = showTags;
window.showAddCategoryForm = showAddCategoryForm;
window.hideAddCategoryForm = hideAddCategoryForm;
window.showAddTagForm = showAddTagForm;
window.hideAddTagForm = hideAddTagForm;
window.editCategory = editCategory;
window.editTag = editTag;
window.deleteCategory = deleteCategory;
window.deleteTag = deleteTag;
