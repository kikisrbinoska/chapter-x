using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Admin.Commands
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, DeleteResponse>
    {
        private readonly IAdminRepository _adminRepository;
        private readonly ILogger<DeleteHandler> _logger;

        public DeleteHandler(IAdminRepository adminRepository, ILogger<DeleteHandler> logger)
        {
            _adminRepository = adminRepository;
            _logger = logger;
        }

        public async Task<DeleteResponse> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var admin = await _adminRepository.GetByIdAsync(request.Id, cancellationToken);
            if (admin is null)
                return new DeleteResponse(false);

            await _adminRepository.DeleteAsync(admin, cancellationToken);

            return new DeleteResponse(true);
        }
    }
}
