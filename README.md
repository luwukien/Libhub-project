# PROJECT TEAM 4

Welcome to the PROJECT TEAM 4. And we are BoyFốur.

## Description

Libhub stands for Library Hub. This is an innovative improvement to the schools library system, designed to enhance students learning experience. It simplifies the search for academic resources, making it easier to find relevant materials.  As a reader and at FPT University, we want to create a student-friendly library that helps them enjoy reading. Not only is it a quiet space to study, the library is also a place to inspire, stimulate creativity and connect knowledge-loving souls. We believe that reading not only helps expand knowledge but is also the key to developing critical thinking and creativity.

## Installation

To get started with this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/luwukien/Libhub-project.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Libhub-project  
   ```
3. Navigate to frontend directory:

   ```bash
   cd frontend  
   ```

4. Install dependencies using npm:

   ```bash
   npm install
   ```

## Usage

To start the server, run the following command:

1. Navigate to frontend directory:

   ```bash
   cd frontend  
   ```

2. Run sever:

   ```bash
   npm run dev:all
   ```

This will start the server and it will be accessible at `http://localhost:5173`.

## Endpoint
| Endpoint                       | Description                                         | Usage                                                                                   |
|--------------------------------|-----------------------------------------------------|-----------------------------------------------------------------------------------------|
| http://localhost:5173          | Home page of the application                        | Access this endpoint to view the home page of the application after successful login. |
| http://localhost:5173/signup | Used for user registration                          | Send a POST request with user details (e.g., username, email, password) to register a new user. |
| http://localhost:5173/login    | Used for user authentication and login              | Send a POST request with user credentials (e.g., username, password) to authenticate and login. |
| http://localhost:5173/account  | Move to user's profile                              | Send a GET request with user credentials (e.g., name, mail, link) to render user data on the screen. |
| http://localhost:5173/about     | Move to about Libhub project and introduce members                             | Send a GET request with information (e.g., image member or image team) to submit data for a new post. |
| http://localhost:5173/confession     | Move to confession page. | Send a GET request to retrieve and display posts on the screen.                          |
| http://localhost:5173/books     | Move to a page which display all books in library                                      | Send a GET request to retrieve and display book cover and name book on the screen.                          |
| http://localhost:5173/books/:id     | Move to book details                                       | Send a GET request to retrieve and display information book (e.g., book cover, author, book summary, remaining quantity, ...).                          |
| http://localhost:5173/management     | Move to book management of admin                                       |Display all borrowed books and show some information (e.g., remaining quanlity, borrower, ...).                          |

## Team Members

- Mentor : Lý Ngọc Maii

- Takecare:
    - Trần Văn Khuyến
    - Nguyễn Thị Ngọc Mai
    - Nguyễn Đình Dũng

- Member:
    - Đặng Cao Cường (Leader)

      GitHub: https://github.com/justccuong

    - Lê Bá Dũng

      GitHub: https://github.com/tinybeann

    - Nguyễn Trọng Hiệp

      GitHub: https://github.com/hieppotato

    - Phạm Quốc Anh

      GitHub: https://github.com/anhpqchamp1

    - Nguyễn Hoàng Thảo
    
      GitHub: https://github.com/thaoakatim

    - Lưu Chí Kiên (Meee)

## Meeting Reports
- [Biên bản họp lần 1](https://github.com/TuanVuNguyen89/jsclub-team-3-project/blob/master/Bi%C3%AAn%20b%E1%BA%A3n%20h%E1%BB%8Dp/Bi%C3%AAn%20b%E1%BA%A3n%20h%E1%BB%8Dp%20ng%C3%A0y%201.md)

- [Biên bản họp lần 2](https://github.com/TuanVuNguyen89/jsclub-team-3-project/blob/master/Bi%C3%AAn%20b%E1%BA%A3n%20h%E1%BB%8Dp/Bi%C3%AAn%20b%E1%BA%A3n%20h%E1%BB%8Dp%20ng%C3%A0y%202.md)

- [Biên bản họp lần 3](https://github.com/TuanVuNguyen89/jsclub-team-3-project/blob/master/Bi%C3%AAn%20b%E1%BA%A3n%20h%E1%BB%8Dp/Bi%C3%AAn%20b%E1%BA%A3n%20h%E1%BB%8Dp%20ng%C3%A0y%203.md)

- [Biên bản họp lần 4](https://github.com/TuanVuNguyen89/jsclub-team-3-project/blob/master/Bi%C3%AAn%20b%E1%BA%A3n%20h%E1%BB%8Dp/Bi%C3%AAn%20b%E1%BA%A3n%20h%E1%BB%8Dp%20ng%C3%A0y%204.md)

- [Biên bản họp lần 5](https://github.com/TuanVuNguyen89/jsclub-team-3-project/blob/master/Bi%C3%AAn%20b%E1%BA%A3n%20h%E1%BB%8Dp/Bi%C3%AAn%20b%E1%BA%A3n%20h%E1%BB%8Dp%20ng%C3%A0y%205.md)

## Document
- [Document Libhub](https://docs.google.com/document/d/1pmQno1baoB7y_3l71nIms7S9zbDFDBMlS1tOSNpXQtU/edit?usp=sharing)
