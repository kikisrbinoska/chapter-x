using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Admin.Commands
{
    public class UpdateHandler : IRequestHandler<UpdateRequest, UpdateResponse>
    {
        private readonly IAdminRepository _adminRepository;
        private readonly ILogger<UpdateHandler> _logger;

        public UpdateHandler(IAdminRepository adminRepository, ILogger<UpdateHandler> logger)
        {
            _adminRepository = adminRepository;
            _logger = logger;
        }

        public async Task<UpdateResponse> Handle(UpdateRequest request, CancellationToken cancellationToken)
        {
            var admin = await _adminRepository.GetByIdAsync(request.Id, cancellationToken);
            if (admin is null)
                return new UpdateResponse(false);

            admin.Id = request.UserId;

            await _adminRepository.UpdateAsync(admin, cancellationToken);

            return new UpdateResponse(true);
        }
    }
}
