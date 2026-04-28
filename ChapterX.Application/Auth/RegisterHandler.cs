using ChapterX.Application.Abstractions;
using ChapterX.Domain.Repositories;
using MediatR;

namespace ChapterX.Application.Auth
{
    public class RegisterHandler : IRequestHandler<RegisterRequest, RegisterResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IWriterRepository _writerRepository;
        private readonly IApplicationDbContext _context;

        public RegisterHandler(IUserRepository userRepository, IWriterRepository writerRepository, IApplicationDbContext context)
        {
            _userRepository = userRepository;
            _writerRepository = writerRepository;
            _context = context;
        }

        public async Task<RegisterResponse> Handle(RegisterRequest request, CancellationToken cancellationToken)
        {
            var existing = await _userRepository.GetByEmailAsync(request.Email, cancellationToken);
            if (existing != null)
                throw new InvalidOperationException("Email already in use.");

            await using var transaction = await _context.BeginTransactionAsync(cancellationToken);
            try
            {
                var user = new Domain.Entities.User
                {
                    Username = request.Username,
                    Email = request.Email,
                    Name = request.Name,
                    Surname = request.Surname,
                    Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                await _userRepository.AddAsync(user, cancellationToken);

                var writer = new Domain.Entities.Writer { Id = user.Id };
                await _writerRepository.AddAsync(writer, cancellationToken);

                await transaction.CommitAsync(cancellationToken);
                return new RegisterResponse(user.Id, user.Username, user.Email);
            }
            catch
            {
                await transaction.RollbackAsync(cancellationToken);
                throw;
            }
        }
    }
}
