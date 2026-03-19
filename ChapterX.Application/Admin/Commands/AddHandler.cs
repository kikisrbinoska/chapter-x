using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Admin.Commands
{
    public class AddHandler : IRequestHandler<AddRequest, AddResponse>
    {
        private readonly IAdminRepository _adminRepository;
        private readonly ILogger<AddHandler> _logger;

        public AddHandler(IAdminRepository adminRepository, ILogger<AddHandler> logger)
        {
            _adminRepository = adminRepository;
            _logger = logger;
        }

        public async Task<AddResponse> Handle(AddRequest request, CancellationToken cancellationToken)
        {
            var admin = new Domain.Entities.Admin
            {
                Id = request.UserId
            };

            await _adminRepository.AddAsync(admin, cancellationToken);

            return new AddResponse(admin.Id);
        }
    }
}
