export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface DefenseBlock {
  id: string;
  lines: number[];
  title: string;
  riskLevel: RiskLevel;
  shortAnswer: string;
  fullExplanation: string;
  docsReference?: {
    library: "NumPy" | "SciPy" | "Matplotlib" | "Python";
    concept: string;
    desc: string;
  };
  physicsMath?: string;
  trap?: {
    question: string;
    answer: string;
  };
}

export const defenseDatabase: DefenseBlock[] = [
  {
    id: "imports",
    lines: [1, 2, 3],
    title: "Thư viện sử dụng",
    riskLevel: "low",
    shortAnswer:
      "Dạ NumPy để tính toán vector, Matplotlib để vẽ hình, SciPy để giải phương trình vi phân ạ.",
    fullExplanation:
      "Chúng em chọn SciPy vì nó là thư viện chuẩn công nghiệp cho các bài toán khoa học kỹ thuật, độ chính xác cao hơn tự viết tay.",
    docsReference: {
      library: "SciPy",
      concept: "scipy.integrate",
      desc: "Sub-package for integration and ordinary differential equation solvers.",
    },
  },
  {
    id: "params",
    lines: [6, 7, 8, 9, 11, 12],
    title: "Thông số đề bài & Vector",
    riskLevel: "medium",
    shortAnswer:
      "Dạ đây là các hằng số q, m và vector E, B, v0 mà đề bài đã cho.",
    fullExplanation:
      "Các vector này được khai báo dưới dạng NumPy Array để lát nữa tính toán ma trận và vector (như tích có hướng) cho dễ.",
    physicsMath: "\\vec{B} = (0, 0, 1), \\quad \\vec{E} = (0, 0, 500)",
    trap: {
      question: "Nếu thầy đổi từ trường B nằm ngang thì sửa đâu?",
      answer: "Dạ em sửa dòng số 9: B = np.array([1.0, 0, 0]) ạ.",
    },
  },
  {
    id: "motion_func_def",
    lines: [15, 16, 17],
    title: "Hàm trạng thái (motion)",
    riskLevel: "critical",
    shortAnswer:
      "Hàm này phải viết dạng f(t, y) vì Docs của SciPy yêu cầu bắt buộc như vậy ạ.",
    fullExplanation:
      "Biến 'y' ở đây là vector trạng thái (State Vector) chứa 6 phần tử: 3 toạ độ (x,y,z) và 3 vận tốc (vx,vy,vz). Máy tính cần gộp chung lại để giải cùng lúc.",
    docsReference: {
      library: "SciPy",
      concept: "fun(t, y)",
      desc: "Right-hand side of the system. The calling signature is fun(t, y).",
    },
  },
  {
    id: "lorentz_calc",
    lines: [19, 20],
    title: "Tính Lực Lorentz",
    riskLevel: "high",
    shortAnswer:
      "Dạ áp dụng công thức F = q(E + v x B). Em dùng np.cross để tính tích có hướng.",
    fullExplanation:
      "Dòng này là trái tim của bài toán. np.cross(v, B) sẽ trả về vector vuông góc với cả v và B theo quy tắc bàn tay phải.",
    physicsMath: "\\vec{F} = q(\\vec{E} + \\vec{v} \\times \\vec{B})",
    trap: {
      question: "Tại sao không dùng dấu nhân * bình thường?",
      answer:
        "Dạ vì đây là tích vectơ (cross product), dấu * trong Python chỉ là nhân từng phần tử thôi ạ.",
    },
  },
  {
    id: "return_deriv",
    lines: [22, 25],
    title: "Trả về Đạo hàm",
    riskLevel: "critical",
    shortAnswer: "Dạ trả về vận tốc và gia tốc để máy tính vẽ bước tiếp theo.",
    fullExplanation:
      "Hàm này trả về đạo hàm bậc 1 của trạng thái y. Đạo hàm của Vị trí là Vận tốc. Đạo hàm của Vận tốc là Gia tốc (F/m).",
    physicsMath:
      "\\frac{d\\vec{r}}{dt} = \\vec{v}, \\quad \\frac{d\\vec{v}}{dt} = \\vec{a} = \\frac{\\vec{F}}{m}",
  },
  {
    id: "solve_ivp_call",
    lines: [28, 29, 32],
    title: "Giải phương trình (Solver)",
    riskLevel: "high",
    shortAnswer:
      "Dạ hàm solve_ivp sẽ tự động chạy vòng lặp tính toán quỹ đạo từ t=0 đến t_end.",
    fullExplanation:
      "Tụi em dùng tham số max_step=1e-13 (nhỏ xíu) để đảm bảo quỹ đạo cong mượt mà, không bị gãy khúc do electron bay quá nhanh.",
    docsReference: {
      library: "SciPy",
      concept: "solve_ivp",
      desc: "This function numerically integrates a system of ordinary differential equations given an initial value.",
    },
    trap: {
      question: "Thuật toán bên trong hàm này là gì?",
      answer:
        "Dạ mặc định nó dùng phương pháp Runge-Kutta bậc 5(4) (RK45) ạ. Em đọc docs thấy họ ghi vậy.",
    },
  },
  {
    id: "plotting",
    lines: [35, 36, 38, 39, 40],
    title: "Vẽ đồ thị 3D",
    riskLevel: "low",
    shortAnswer: "Dùng Matplotlib để vẽ không gian 3 chiều ạ.",
    fullExplanation:
      "Tụi em lấy dữ liệu từ kết quả sol.y để vẽ. sol.y[0,1,2] tương ứng với x, y, z.",
    trap: {
      question: "Làm sao biết sol.y[0] là x?",
      answer:
        "Dạ do lúc đầu ở dòng 12 tụi em đã quy ước thứ tự nhập vào là x, y, z rồi ạ.",
    },
  },
];
