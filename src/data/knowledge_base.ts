export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface DefenseBlock {
  id: string;
  lines: number[];
  title: string;
  riskLevel: RiskLevel;
  mnemonic: string;
  shortAnswer: string;
  deepDive: string[];

  docsSnippet?: {
    title: string;
    contentHTML: string;
    sourceUrl: string;
  };

  trap?: {
    question: string;
    answer: string;
  };
}

export const defenseDatabase: DefenseBlock[] = [
  {
    id: "setup_tools",
    lines: [1, 2, 3],
    title: "1. Khởi tạo Môi trường",
    riskLevel: "low",
    mnemonic: "Tooling: Tính toán (NumPy) - Giải (SciPy) - Vẽ (Matplotlib)",
    shortAnswer:
      "Khai báo các thư viện tính toán khoa học chuẩn của Python. NumPy để xử lý đại số tuyến tính (Vector), SciPy để giải phương trình vi phân, và Matplotlib để trực quan hóa dữ liệu.",
    deepDive: [
      "Tại sao cần NumPy? Python thuần túy xử lý danh sách (List) rất chậm và không hỗ trợ các phép toán ma trận/vector trực tiếp. NumPy là lõi C++ giúp tính toán hiệu năng cao.",
      "Tại sao chọn SciPy? Thay vì tự viết thuật toán giải tích số (dễ sai sót), ta sử dụng thư viện đã được kiểm chứng trong công nghiệp và nghiên cứu khoa học.",
    ],
    docsSnippet: {
      title: "scipy.integrate",
      sourceUrl: "https://docs.scipy.org/doc/scipy/reference/integrate.html",
      contentHTML: `
        <div class="docs-mock">
          <p><strong>scipy.integrate</strong></p>
          <p>Sub-package for integration and ordinary differential equation (ODE) solvers.</p>
          <hr/>
          <p><strong>Solving initial value problems for ODE systems:</strong></p>
          <ul>
            <li><code>solve_ivp</code>: Solve an initial value problem for a system of ODEs.</li>
          </ul>
        </div>
      `,
    },
  },
  {
    id: "input_params",
    lines: [6, 7, 8, 9, 11, 12],
    title: "2. Số hóa Đề bài",
    riskLevel: "medium",
    mnemonic: "Mapping: Thực tế -> Vector số học",
    shortAnswer:
      "Chuyển đổi các thông số vật lý từ đề bài sang định dạng Vector của NumPy để máy tính có thể xử lý.",
    deepDive: [
      "np.array([...]): Bắt buộc phải bọc trong hàm này để tạo ra đối tượng Vector. Nếu để list thường [0,0,1], Python sẽ hiểu là danh sách chứa số, không thể thực hiện phép nhân có hướng (Cross Product).",
      "Hệ tọa độ: Sử dụng hệ tọa độ Descartes Oxyz. Vector [0, 0, 1] nghĩa là vector đơn vị hướng theo trục Z.",
    ],
    trap: {
      question: "Tại sao vận tốc đầu v0 lại có 3 thành phần?",
      answer:
        "Vì đây là bài toán không gian 3 chiều. Vận tốc là một đại lượng vector, cần được xác định bởi các thành phần chiếu lên 3 trục Ox, Oy, Oz.",
    },
  },
  {
    id: "motion_logic",
    lines: [15, 16, 17, 25],
    title: "3. Cấu hình Hệ thống (Quan trọng)",
    riskLevel: "critical",
    mnemonic: "Protocol: Input (t, y) -> Output (Derivative)",
    shortAnswer:
      "Định nghĩa hàm mô tả hệ thống theo chuẩn 'Signature' bắt buộc của thư viện SciPy: f(t, y). Hàm này nhận vào trạng thái hiện tại và trả về tốc độ thay đổi (đạo hàm) của trạng thái đó.",
    deepDive: [
      "Biến y (State Vector): Máy tính gộp chung Vị trí (r) và Vận tốc (v) vào một mảng duy nhất gồm 6 phần tử để xử lý đồng bộ.",
      "Mapping chỉ số: y[0-2] là toạ độ (x,y,z); y[3-5] là vận tốc (vx,vy,vz).",
      "Output: Hàm trả về đạo hàm bậc 1. Đạo hàm của vị trí là vận tốc. Đạo hàm của vận tốc là gia tốc.",
    ],
    docsSnippet: {
      title: "scipy.integrate.solve_ivp",
      sourceUrl:
        "https://docs.scipy.org/doc/scipy/reference/generated/scipy.integrate.solve_ivp.html",
      contentHTML: `
        <div class="docs-mock">
          <span class="sig-name">solve_ivp</span>
          <span class="sig-paren">(</span>
          <em class="sig-param">fun</em>, 
          <em class="sig-param">t_span</em>, 
          <em class="sig-param">y0</em>
          <span class="sig-paren">)</span>
          <p><strong>fun : callable</strong></p>
          <p>Right-hand side of the system. The calling signature is <code>fun(t, y)</code>. Here <code>t</code> is a scalar, and there are two options for the ndarray <code>y</code>.</p>
        </div>
      `,
    },
    trap: {
      question: "Tại sao không thấy code tính vị trí mới (x = x0 + vt)?",
      answer:
        "Việc tính toán tích phân để tìm vị trí mới là trách nhiệm của thuật toán Solver (Runge-Kutta) nằm bên trong thư viện. Hàm này chỉ có trách nhiệm cung cấp đạo hàm tức thời.",
    },
  },
  {
    id: "lorentz_physics",
    lines: [19, 20],
    title: "4. Lõi Vật lý (Lorentz Force)",
    riskLevel: "high",
    mnemonic: "Physics: Cross Product (Tích có hướng)",
    shortAnswer:
      "Áp dụng công thức lực Lorentz: F = q(E + v x B). Sử dụng hàm np.cross để tính tích có hướng chính xác giữa vận tốc và từ trường.",
    deepDive: [
      "Bản chất toán học: Tích có hướng của hai vector v và B sẽ tạo ra một lực vuông góc với cả hai vector đó (Quy tắc bàn tay phải).",
      "Lỗi thường gặp: Nếu dùng dấu nhân (*) thông thường, Python sẽ thực hiện nhân từng phần tử (Element-wise multiplication), dẫn đến sai lệch hoàn toàn về bản chất vật lý.",
    ],
    docsSnippet: {
      title: "numpy.cross",
      sourceUrl:
        "https://numpy.org/doc/stable/reference/generated/numpy.cross.html",
      contentHTML: `
        <div class="docs-mock">
          <span class="sig-name">numpy.cross</span>
          <span class="sig-paren">(</span>
          <em class="sig-param">a</em>, 
          <em class="sig-param">b</em>
          <span class="sig-paren">)</span>
          <p>Return the cross product of two (arrays of) vectors.</p>
          <p>The cross product of <code>a</code> and <code>b</code> in $R^3$ is a vector perpendicular to both <code>a</code> and <code>b</code>.</p>
        </div>
      `,
    },
  },
  {
    id: "solver_exec",
    lines: [28, 29, 32],
    title: "5. Thực thi Giải thuật",
    riskLevel: "medium",
    mnemonic: "Algorithm: RK45 (Runge-Kutta)",
    shortAnswer:
      "Kích hoạt bộ giải phương trình vi phân (Solver). Thiết lập bước nhảy thời gian (max_step) đủ nhỏ để đảm bảo độ mịn và chính xác của quỹ đạo.",
    deepDive: [
      "t_span: Khoảng thời gian mô phỏng. Cần chọn phù hợp với vận tốc hạt để quan sát đủ quỹ đạo.",
      "max_step=1e-13: Kiểm soát sai số. Electron chuyển động với tần số cyclotron rất lớn, nếu bước nhảy thời gian quá lớn, thuật toán sẽ bỏ qua các đoạn cong quan trọng, làm quỹ đạo bị méo (aliasing).",
    ],
    trap: {
      question: "Thuật toán cụ thể được sử dụng là gì?",
      answer:
        "Mặc định hàm solve_ivp sử dụng phương pháp Runge-Kutta bậc 5(4) (Explicit Runge-Kutta method of order 5(4)). Đây là thuật toán tiêu chuẩn cân bằng giữa hiệu năng và độ chính xác.",
    },
  },
  {
    id: "visualization",
    lines: [35, 36, 38, 39, 40],
    title: "6. Trực quan hóa (3D Plotting)",
    riskLevel: "low",
    mnemonic: "Output: Slicing Data -> Graph",
    shortAnswer:
      "Trích xuất dữ liệu kết quả từ đối tượng solution và vẽ đồ thị quỹ đạo trong không gian 3 chiều.",
    deepDive: [
      "sol.y: Là mảng chứa toàn bộ lịch sử trạng thái.",
      "Slicing: sol.y[0] là toàn bộ lịch sử toạ độ X, sol.y[1] là Y, sol.y[2] là Z.",
      "Scatter: Đánh dấu điểm đầu và điểm cuối để dễ quan sát hướng chuyển động.",
    ],
  },
];
